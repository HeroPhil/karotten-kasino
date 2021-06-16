import { Socket } from "socket.io";
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
                lobby.addPlayer(socket.id, displayName);

                socket.rooms.forEach((room: string) => socket.leave(room));
                socket.join(socket.id);
                socket.join(lobbyCode);

                socket.emit("joinLobbyAkw");
                server.io.in(lobby.id).emit("playerList", lobby.getPlayers().map<string>((player) => player.displayName));
            });
        });

    }

    // emitPlayerList(socket: Socket, lobby?: Lobby | undefined) {
    //     if (lobby == undefined) {
    //         lobby = this.getLobbyFromPlayerId(socket.id);
    //     }
    //     if (lobby == undefined) {
    //         console.warn("Security breach! " + socket.id + " pretends to be playing!");
    //         return;
    //     }
    //     socket.emit("playerList", lobby.getPlayers().map<string>((player) => player.displayName));
    // }

}