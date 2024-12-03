const express = require('express');
const cors = require('cors');
const server = express();
const port = 3000;
server.use(cors());

//Our controller file handles the logic of requests

server.use(express.json());

/**
 * The dummy root endpoint
 */
server.get('/', (req, res) => {
    res.send({
        message: "Server is up and running!"
    })
})