import { LobbyHandler } from "./price-is-nice";
import { BackendServer } from "./server";

export const server = new BackendServer();

const lobbyHandler = new LobbyHandler();

server.addSocketHandler((socket) => {
    socket.on("getTime", () => {
        console.log("time requested");
        socket.emit("resTime", Date.now().toLocaleString());
    });
});

server.start();


