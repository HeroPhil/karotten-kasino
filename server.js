const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "frontend/dist/karotten-kasino")));

app.set('port', port);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/karotten-kasino/index.html"));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/karotten-kasino/index.html"));
});

const server = http.createServer(app);

server.listen(port);


