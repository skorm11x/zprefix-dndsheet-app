const express = require('express');
const cors = require('cors');
const server = express();
const port = 3000;
const host = '0.0.0.0';
server.use(cors());

/**
 * Our controller file handles the logic of requests,
 * define a str array (set) that contains current endpoints
 */
const { 
    getAllTableEntries,
    getQueryTableEntries
 } = require('./controller.js');

const validReqPaths = ['/users', '/characters', 
    '/environments', '/games', '/active_games', '/user_games',
    '/login']

server.use(express.json());

server.get('*', (req, res) => {
    getReqHandler(req, res);
});

/**
 * Takes in a http get request for all path and queries and route
 * to appropriate functions in controller
 * @param {*} req 
 */
function getReqHandler(req, res) {
    let params = req.query;
    let path = req.path;

    if(validReqPaths.includes(path)){
        if (Object.keys(params).length === 0) {
            getAllTableEntries(path.slice(1, path.length))
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        } else{
            getQueryTableEntries(path.slice(1, path.length), params)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        }
    } else{
        //bad endpoint
        res.status(404).send(`Invalid endpoint specified: ${path}`);
    }
}

function postReqHandler(req, res) {
    let params = req.query;
    let path = req.path;

    if(validReqPaths.includes(path)){
        console.log(`processing post for ${path} params: ${JSON.stringify(params)}`);
    }
}

server.listen(port, host, () => console.log(`Server is listening at port ${port}`));