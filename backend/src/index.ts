import { PriceIsNiceHandler } from "./price-is-nice/priceIsNiceHandler";
import { BackendServer } from "./server";

export const server = new BackendServer();

new PriceIsNiceHandler();

server.addSocketHandler((socket) => {
    socket.on("getTime", () => {
        console.log("time requested");
        socket.emit("resTime", Date.now().toLocaleString());
    });
});

server.start();


