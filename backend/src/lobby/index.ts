import { Socket } from "socket.io";
import { isObject } from "util";
import { server } from "..";
import { GuessInformation } from "./guessInformation";
import { Lobby, LobbyStatus } from "./lobby";

export class LobbyHandler {

    lobbies: Lobby[] = [];


    getLobbyFromPlayerId(playerId: string): Lobby | undefined {
        for (const lobby of this.lobbies) {
            if (lobby.hasPlayer(playerId)) {
                return lobby;
            }
        }
    }

    advanceLobby(lobby: Lobby) {
        if (lobby != undefined) {
            lobby.advanceLobbyStatus();
            server.io.to(lobby.id).emit("lobbyStatus", lobby.getLobbyStatus());
        }
    }

    // TODO use in disconnect protocol
    setBaboIfNonExists(lobby: Lobby) {
        if (lobby.baboId == undefined || lobby.getBabo() == undefined) {
            lobby.setNextBabo();
        }
    }

    crownNewBabo(lobby: Lobby) {
        // overthrow old babo
        server.io.to(lobby.baboId).emit("youAreBabo", false);

        // find new babo
        lobby.setNextBabo();

        // tell everyone
        server.io.in(lobby.id).emit("playerList", lobby.getPlayers().map((player) => {
            return {
                displayName: player.displayName,
                isBabo: (player.id == lobby!.baboId),
            }
        }));
        // including the new babo of course
        server.io.to(lobby.baboId).emit("youAreBabo", true);
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

                server.io.in(lobby.id).emit("playerList", lobby.getPlayers().map((player) => {
                    return {
                        displayName: player.displayName,
                        isBabo: (player.id == lobby!.baboId),
                    }
                }));
                if (lobby.baboId == socket.id) {
                    socket.emit("youAreBabo", true);
                }
            });
        });

        server.addSocketHandler(socket => {
            socket.on("takeGuess", (args) => {
                const guessValue = args.guessValue;

                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby == undefined || currentLobby.getLobbyStatus() != LobbyStatus.guessOpen) {
                    return;
                }
                const currentPlayer = currentLobby.getPlayer(socket.id);

                if (currentPlayer == undefined || currentPlayer.id == currentLobby.baboId) {
                    return;
                }

                if (currentPlayer.guess == undefined) {
                    currentPlayer.guess = guessValue;
                }

                socket.emit("takeGuessAkw");

                if (currentLobby.allPlayersHaveGuessed()) {

                    // calc points etc

                    server.io.to(currentLobby.id).emit("guessResults", currentLobby.getPlayers().filter((player) => player.id != currentLobby.baboId).map(player => {
                        return {
                            displayName: player.displayName,
                            guessValue: player.guess
                        }
                    }));

                    this.advanceLobby(currentLobby); // to 3
                }

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
                    currentLobby.clearGuesses();
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
                    const price: number = args.price;

                    currentLobby.currentGuessInformation = new GuessInformation(price);
                    
                    this.advanceLobby(currentLobby); // to 2

                }


            });
        });

    }




}