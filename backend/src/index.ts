import express from "express";
import http from "http";

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + "/frontend/dist/karotten-kasino"));

app.set('port', port);

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/frontend/dist/karotten-kasino");
});

const server = http.createServer(app);

server.listen(port, () => console.log("Server running on localhost:"+port+"🚀"));

module.exports.app = app;
