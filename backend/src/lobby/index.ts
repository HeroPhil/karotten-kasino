import { server } from "..";
import { Lobby } from "./lobby";

export class LobbyHandler {

    getLobbyFromPlayerId(playerId: string): Lobby | undefined {
        for (const lobby of this.lobbies) {
            if (lobby.hasClient(playerId)) {
                return lobby;
            }
        }
    }

    lobbies: Lobby[] = [];

    constructor() {

        server.addSocketHandler(socket => {
            socket.on("joinLobby", (lobbyCode) => {
                console.log(socket.id + " joining lobby " + lobbyCode);

                let lobby = undefined;
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
                lobby.addClient(socket.id);

                socket.rooms.forEach((room: string) => socket.leave(room));
                socket.join(socket.id);
                socket.join(lobbyCode);

                socket.emit("joinLobbyAkw");
            });
        });

        server.addSocketHandler((socket) => {
            socket.on("getPlayers", () => {
                const currentLobby = this.getLobbyFromPlayerId(socket.id);
                if (currentLobby == undefined) {
                    console.warn("Security breach! " + socket.id + " pretends to be playing!");
                    return;
                }

                console.log("sending playerlist: " + currentLobby.getClients());

                socket.emit("playerList", currentLobby.getClients());
            });
        });

    }
}