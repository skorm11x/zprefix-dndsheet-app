require('dotenv').config();
const environment = process.env.ENVIRONMENT;

const knex = require("knex")(require("./knexfile.js")[environment]);
const userFields = ['fname', 'lname', 'handle', 'username', 'password', 'role'];
const characterFields =  ['fname', 'lname', 'race', 'class', 'alignment', 'deity',
     'background', 'str', 'dex', 'con', 'int', 'wis', 'cha'];
const environmentFields = ['name'];
const gamesFields = ['name', 'dm_id', 'environment_id', 'start_date'];
const activeGamesFields = ['game_id'];
const userGamesFields = ['user_id', 'game_id', 'character_id'];


async function getAllTableEntries(path) {
    console.log(`path is ${path}`);
    const entries = await knex(path).select('*');
    return entries;
}

/**
 * Build out the query then execute
 * @param {*} path 
 * @param {*} params 
 */
async function getQueryTableEntries(path, params) {
    console.log(`path is ${path} with params: ${JSON.stringify(params)}`);
    let query =  knex(path).select("*");

    //need to put the params in string quote for close comparison!
    //TODO: check if this is ok for Number/ decimal field
    //explicitly handle numbers/ non string fields
    switch(path) {
        case 'users':
            userFields.forEach(field => {
                if(params[field]) {
                    if(field == 'role'){
                        query = query.where(field, '=', parseInt(params[field]));
                    } else{
                        query = query.where(field, 'LIKE', `%${params[field]}%`);
                    }
                }
            })
            break;
        case 'characters':
            characterFields.forEach(field => {
                if(params[field]) {
                    if(field == 'str' || field == 'dex' || field == 'con' ||
                        field == 'int' || field == 'wis' || field == 'cha'
                    ){
                        query = query.where(field, '=', parseInt(params[field]));
                    } else{
                        query = query.where(field, 'LIKE', `%${params[field]}%`);
                    }
                }
            })
            break;
        case 'environments':
            environmentFields.forEach(field => {
                if(params[field]) {
                    query = query.where(field, 'LIKE', `%${params[field]}%`);
                }
            })
            break;
        case 'games':
            gamesFields.forEach(field => {
                if(params[field]) {
                    if(field == 'dm_id' || field == 'environment_id'){
                        query = query.where(field, '=', parseInt(params[field]));
                    }
                    query = query.where(field, 'LIKE', `%${params[field]}%`);
                }
            })
            break;
        case 'active_games':
            activeGamesFields.forEach(field => {
                if(params[field]) {
                    query = query.where(field, '=', parseInt(params[field]));
                }
            })
            break;
        case 'user_games':
            userGamesFields.forEach(field => {
                if(params[field]) {
                    query = query.where(field, '=', parseInt(params[field]));
                }
            })
            break;
    }

    console.log(`built final query: ${query}`)
    const result = await query;
    return result;
}

async function postTableEntries(path, params) {
    console.log(`path is ${path} with params: ${JSON.stringify(params)}`);

    switch(path){
        case 'login':
            console.log(`login attempt with params: ${JSON.stringify(params)}`)
            break;
    }
}

module.exports = { 
    getAllTableEntries,
    getQueryTableEntries
}

