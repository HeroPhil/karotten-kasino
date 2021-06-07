import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const app = express();
const port = process.env.PORT || 3000;

export const startServer = () => {
    app.use(express.static(process.cwd() + "/frontend/dist/karotten-kasino"));

    app.set('port', port);

    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + "/frontend/dist/karotten-kasino");
    });

    const server = http.createServer(app);

    const io = new Server(server,
        // { cors: { origin: "localhost:" + port } }
    );

    io.on("connection", (socket) => {
        console.log("new connection: " + socket.id);

        socket.on("getTime", () => {
            console.log("time requested");
            socket.emit("resTime", Date.now().toLocaleString());
        });

    });

    server.listen(port, () => console.log("Server running on localhost:" + port + "🚀"));
}

