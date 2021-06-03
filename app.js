const express = require('express');
const path = require('path');
const app = express();

app.use("/", express.static(path.join(__dirname, "frontend/dist/karotten-kasino")));
app.use((req, res, next) => res.sendFile(__dirname, "frontend/dist/karotten-kasino", "index.html"));

module.exports = app;
