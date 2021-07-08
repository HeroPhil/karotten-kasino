import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export class BackendServer {
    app = express();
    port = process.env.PORT || 3000;
    private socketHandlers: ((socket: Socket) => void)[] = [];
    io!: Server;

     start(): void {
        this.app.use(express.static(process.cwd() + "/frontend/dist/karotten-kasino"));

        this.app.set('port', this.port);

        this.app.get('/', (req, res) => {
            res.sendFile(process.cwd() + "/frontend/dist/karotten-kasino");
        });

        const server = http.createServer(this.app);

        this.io = new Server(server,
            // { cors: { origin: "localhost:" + port } }
        );

        this.io.on("connection", (socket) => {
            console.log("new connection: " + socket.id);

            this.socketHandlers.forEach(handler => {
                handler(socket);
            });

        });

        server.listen(this.port, () => console.log("Server running on localhost:" + this.port + "🚀"));
    }

    addSocketHandler(handler: (socket: Socket) => void): void {
        this.socketHandlers.push(handler);
    }

}





