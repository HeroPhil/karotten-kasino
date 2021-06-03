
const http = require('http');
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}`));

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log("server running");
})