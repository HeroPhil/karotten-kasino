import { Socket } from "socket.io";
import { isObject } from "util";
import { server } from "..";
import { Lobby } from "./lobby";

export class LobbyHandler {

    getLobbyFromPlayerId(playerId: string): Lobby | undefined {
        for (const lobby of this.lobbies) {
            if (lobby.hasPlayer(playerId)) {
                return lobby;
            }
        }
    }

    lobbies: Lobby[] = [];

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
                if (currentLobby == undefined) {
                    return;
                }
                const currentPlayer = currentLobby.getPlayer(socket.id);


                if (currentPlayer != undefined && currentPlayer.guess == undefined) {
                    currentPlayer.guess = guessValue;
                }

                socket.emit("takeGuessAkw");

                if (currentLobby.allPlayersHaveGuessed()) {

                    // calc points etc

                    server.io.in(currentLobby.id).emit("guessResults", currentLobby.getPlayers().filter((player) => player.id != currentLobby.baboId).map(player => {
                        return {
                            displayName: player.displayName,
                            guessValue: player.guess
                        }
                    }));
                }

            });
        });

    }


}