import { server } from "..";
import { GuessInformation } from "./models/guessInformation";
import { Lobby, LobbyStatus } from "./models/lobby";
import { PlayerStatus } from "./models/player";

export class PriceIsNiceHandler {

    lobbies: Lobby[] = [];


    getLobbyFromPlayerId(playerId: string): Lobby | undefined {
        for (const lobby of this.lobbies) {
            if (lobby.hasPlayer(playerId)) {
                return lobby;
            }
        }
    }

    advanceLobby(lobby: Lobby, newLobbyStatus?: LobbyStatus) {
        if (lobby != undefined) {
            if (newLobbyStatus != undefined) {
                lobby.setLobbyStatus(newLobbyStatus);
            } else {
                lobby.advanceLobbyStatus();
            }
            server.io.to(lobby.id).emit("lobbyStatus", lobby.getLobbyStatus());
            this.publishPlayerList(lobby);
        }
    }

    publishPlayerList(lobby: Lobby) {
        server.io.in(lobby.id).emit("playerList", lobby.getPlayers().map((player) => {
            return {
                displayName: player.displayName,
                playerStatus: lobby!.getPlayerStatus(player.id),
                points: player.points,
            }
        }).sort((a, b) => a.playerStatus == PlayerStatus.babo ? -1 : (b.playerStatus == PlayerStatus.babo ? 1 : b.points - a.points)));
    }

    crownNewBabo(lobby: Lobby) {
        // overthrow old babo
        if (lobby.baboId != undefined) {
            server.io.to(lobby.baboId).emit("youAreBabo", false);
        }

        // find new babo
        lobby.setNextBabo();

        // tell everyone
        this.publishPlayerList(lobby);

        // including the new babo of course
        server.io.to(lobby.baboId!).emit("youAreBabo", true);
    }

    awardPointsIfAllPlayersHaveGuessed(lobby: Lobby) {
        if (lobby.allPlayersHaveGuessed()) {

            // calc points etc
            lobby.getPlayers().forEach((player) => {
                if (player.id == lobby.baboId) {
                    return;
                }
                player.compareToSolution(lobby.currentGuessInformation!.price);
            });
            lobby.getPlayers()
                .filter((player) => player.id != lobby.baboId)
                .slice()
                .sort((a, b) => a.guessDelta! - b.guessDelta!)
                .forEach((maybeARefPlayer, index, rankedPlayer) => {
                    if (maybeARefPlayer.id == lobby.baboId) {
                        return;
                    }
                    const player = lobby.getPlayer(maybeARefPlayer.id);
                    if (player == undefined) {
                        return;
                    }
                    let pos = index + 1;
                    for (let offset = 1; offset <= index; offset++) {
                        if (rankedPlayer[index - offset].guessDelta! < player.guessDelta!) {
                            break;
                        }
                        pos--;
                    }
                    if (pos <= 3) {
                        player.givePoints(4 - pos); // TODO better points distribution″
                    }
                    if (player.guessValue == lobby.currentGuessInformation?.price) {
                        player.givePoints(1);
                    }
                });

            server.io.to(lobby.id).emit("guessResults", lobby.getPlayers().filter((player) => player.id != lobby.baboId).map(player => {
                return {
                    displayName: player.displayName,
                    guessValue: this.parseCurrency(player.guessValue ?? 0),
                    guessDelta: this.parseCurrency(player.guessDelta ?? 0),
                    points: player.points,
                    pointsDelta: player.pointsDelta,
                }
            }));

            server.io.to(lobby.id).emit("guessInformation", lobby.currentGuessInformation!.getAllInformation());

            this.advanceLobby(lobby); // to 3
        }
    }


    constructor() {

        server.addSocketHandler(socket => {
            socket.on("joinLobby", (args) => {
                const lobbyCode = args.lobbyCode;
                const displayName = args.displayName;

                console.log(socket.id + " joining lobby " + lobbyCode);

                let lobby: Lobby | undefined = undefined;
                for (const l of this.lobbies) {
                    if (l.id == lobbyCode) {
                        lobby = l;
                        break;
                    }
                }
                if (lobby == undefined) {
                    lobby = new Lobby(lobbyCode);
                    this.lobbies.push(lobby);
                }
                lobby.addPlayer(socket.id, displayName);

                socket.rooms.forEach((room: string) => socket.leave(room));
                socket.join(socket.id);
                socket.join(lobbyCode);

                socket.emit("joinLobbyAkw");

                socket.emit("lobbyStatus", lobby.getLobbyStatus());

                this.publishPlayerList(lobby);

                if (lobby!.currentGuessInformation != undefined) {
                    switch (lobby.getLobbyStatus()) {
                        case LobbyStatus.guessOpen:
                            socket.emit("guessInformation", lobby!.currentGuessInformation!.getNonSensitiveInformation());
                        case LobbyStatus.guessClosed:
                            socket.emit("guessInformation", lobby!.currentGuessInformation!.getAllInformation());
                    }
                }

                socket.to(lobby.id).emit("playerJoined", lobby.getPlayer(socket.id)?.displayName);

                if (lobby.baboId == socket.id) {
                    socket.emit("youAreBabo", true);
                }
            });
        });

        server.addSocketHandler(socket => {
            socket.on("takeGuess", (args) => {
                const guessValue = this.parseCurrency(args.guessValue);

                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby == undefined || currentLobby.getLobbyStatus() != LobbyStatus.guessOpen) {
                    return;
                }
                const currentPlayer = currentLobby.getPlayer(socket.id);

                if (currentPlayer == undefined || currentPlayer.id == currentLobby.baboId) {
                    return;
                }

                if (currentPlayer.guessValue == undefined) {
                    currentPlayer.guessValue = guessValue;
                }

                socket.emit("takeGuessAkw");

                this.awardPointsIfAllPlayersHaveGuessed(currentLobby);


            });
        });

        server.addSocketHandler(socket => {
            socket.on("closeRound", (args) => {
                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby == undefined) {
                    return;
                }

                if (currentLobby.getLobbyStatus() == LobbyStatus.guessClosed && socket.id == currentLobby.baboId) {
                    this.advanceLobby(currentLobby); // to 0
                    currentLobby.prepNextRound();
                    this.crownNewBabo(currentLobby);
                    this.advanceLobby(currentLobby); // to 1
                }
            });
        });

        server.addSocketHandler(socket => {
            socket.on("submitGuessInformation", (args) => {

                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby == undefined) {
                    return;
                }

                if (currentLobby.getLobbyStatus() == LobbyStatus.roundStart && socket.id == currentLobby.baboId) {

                    currentLobby.currentGuessInformation = new GuessInformation(
                        this.parseCurrency(args.price),
                        args.name,
                        args.description,
                        args.imageUrls
                    );

                    this.advanceLobby(currentLobby); // to 2

                    socket.to(currentLobby.id).emit("guessInformation", currentLobby.currentGuessInformation.getNonSensitiveInformation());
                    socket.emit("guessInformation", currentLobby.currentGuessInformation.getAllInformation());

                }

            });
        });

        server.addSocketHandler(socket => {
            socket.on("disconnect", (reason) => {
                console.log("player " + socket.id + " disconnected; Reason: " + reason);

                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby != undefined) {

                    const player = currentLobby.getPlayer(socket.id);
                    currentLobby.yeetPlayer(player!.id);

                    // remove lobby if lobby is empty
                    if (currentLobby.getPlayers().length < 1) {
                        console.log("lobby " + currentLobby.id + " closed; Reason: No players left.");
                        this.lobbies.splice(this.lobbies.indexOf(currentLobby), 1);
                        return;
                    }

                    // handle if leaving player is current babo
                    if (socket.id == currentLobby.baboId) {
                        this.advanceLobby(currentLobby, LobbyStatus.roundSetup);
                        currentLobby.prepNextRound();
                        this.crownNewBabo(currentLobby);
                        this.advanceLobby(currentLobby); // to 1
                    }

                    // update player list for all other clients
                    socket.to(currentLobby.id).emit("playerYeeted", player!.displayName);
                    this.publishPlayerList(currentLobby);

                    // if round could have resumed after player left, check if the leaving player was the only one still to guess
                    if (currentLobby.getLobbyStatus() == LobbyStatus.guessOpen) {
                        this.awardPointsIfAllPlayersHaveGuessed(currentLobby);
                    }
                }
            });
        });

    }

    private parseCurrency(value: string | number): number {
        value = value.toString();
        value = value.trim();
        value = value.replace(',', '.');
        value = Number.parseFloat(value);
        value = value.toFixed(2);
        value = Number.parseFloat(value);
        return value;
    }

}