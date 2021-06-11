import { BackendServer } from "./server";

export const server = new BackendServer();

server.addSocketHandler((socket) => {
    return socket.on("getTime", () => {
        console.log("time requested");
        socket.emit("resTime", Date.now().toLocaleString());
    });
});

server.start();


