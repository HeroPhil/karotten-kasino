const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "frontend/dist/karotten-kasino")));

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
