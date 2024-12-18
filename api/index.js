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
    postTableEntries,
    deleteQueryTableEntries,
    patchQueryTableEntries
 } = require('./controller.js');

const validGetReqPaths = ['/users', '/characters', 
    '/environments', '/games', '/active_games',
    '/user_games'];
const validPostReqPaths = ['/users', '/characters',
    '/environments', '/games', '/login', '/user_games'
];
const validDeleteReqPaths = ['/users', '/characters', '/environments', '/games']; //TODO on permissions needing ownership
const validPatchReqPaths = ['/games'];

server.use(express.json());

server.get('*', (req, res) => {
    getReqHandler(req, res);
});

server.post('*', (req, res) => {
    postReqHandler(req, res);
});

server.delete('*', (req, res) => {
    deleteReqHandler(req, res);
});

server.patch('*', (req, res) => {
    patchReqHandler(req, res);
})

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

function deleteReqHandler(req, res) {
    let params = req.query;
    let path = req.path;
    console.log(`received delete of ${path} with params: ${JSON.stringify(params)}`);

    if(validDeleteReqPaths.includes(path)){
        //forbidden to delete everything
        if (Object.keys(params).length === 0) {
            res.status(403).send(`Illegal delete of all: ${path}`);
        } else {
            deleteQueryTableEntries(path.slice(1, path.length), params)
                .then((data) => {
                    console.log(`delete success`)
                    res.status(200).send();
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

function patchReqHandler(req, res) {
    let params = req.body;
    let query = req.query;
    let path = req.path;
    console.log(`received patch of ${path} with params: ${JSON.stringify(params)} query: ${JSON.stringify(query)}`);
    if(validDeleteReqPaths.includes(path)){
        if (Object.keys(params).length === 0) {
            res.status(403).send(`Illegal patch of all: ${path}`);
        } else {
            patchQueryTableEntries(path.slice(1, path.length), params, query)
                .then((data) => {
                    console.log(`patch success`)
                    res.send(data);
                })
                .catch((err) => {
                    res.status(404).send(err);
                });
        }
    }
}

server.listen(port, host, () => console.log(`Server is listening at ${host}:${port}`));