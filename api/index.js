const express = require('express');
const cors = require('cors');
const server = express();
const port = 3000;
const host = 'localhost';
server.use(cors());

/**
 * Our controller file handles the logic of requests,
 * define a str array (set) that contains current endpoints
 * The idea is that it de-couples transport concerns and database access
 * for a cleaner index.js
 */
const { 
    getAllTableEntries,
    getQueryTableEntries,
    postTableEntries
 } = require('./controller.js');

const validGetReqPaths = ['/users', '/characters', 
    '/environments', '/games', '/active_games',
    '/user_games'];
const validPostReqPaths = ['/users', '/characters',
    '/environments', '/games', '/login'
];

server.use(express.json());

server.get('*', (req, res) => {
    getReqHandler(req, res);
});

server.post('*', (req, res) => {
    postReqHandler(req, res);
});

/**
 * Takes in a http get request for all path and queries and route
 * to appropriate handler in controller
 * @param {*} req 
 */
function getReqHandler(req, res) {
    let params = req.query;
    let path = req.path;

    if(validGetReqPaths.includes(path)){
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

/**
 * Takes in a http post request for all path and queries and route
 * to appropriate handler in controller
 * @param {*} req 
 * @param {*} res 
 */
function postReqHandler(req, res) {
    let params = req.body;
    let path = req.path;

    if(validPostReqPaths.includes(path)){
        console.log(`processing post for ${path} params: ${JSON.stringify(params)}`);
        if (Object.keys(params).length === 0) {
            //TODO
        } else{
            postTableEntries(path.slice(1, path.length), params)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
            }
    } else{
        res.status(404).send(`Invalid endpoint specified: ${path}`);
    }
}

server.listen(port, host, () => console.log(`Server is listening at ${host}:${port}`));