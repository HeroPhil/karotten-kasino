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


const fs = require('fs');

async function folders(testFolder) {
    await fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
}

[__dirname, __dirname + "/frontend", __dirname + "/frontend/dist", __dirname + "/frontend/dist/karotten-kasino"].forEach((file) => { folders(file) });

