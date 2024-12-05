require('dotenv').config();
const environment = process.env.ENVIRONMENT;
const bcrypt = require('bcryptjs');
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

/**
 * 
 * @param {*} path : the request endpoint
 * @param {*} params : the request body
 * @returns 
 */
async function postTableEntries(path, params) {
    console.log(`path is ${path} with params: ${JSON.stringify(params)}`);

    switch(path){
        case 'users':
            try{
                const { fname, lname, handle, username, email, password, role } = params;
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await knex("users")
                .insert({
                    email, password: hashedPassword, fname,
                    lname, handle, username, role
                })
                .returning(["id", "fname", "lname", "handle", "username", "role"])

                if (newUser.length === 0) {
                    return { status: "FAILURE", error: "User not created" };
                }
                
                const userStatus = {
                    ...newUser[0],
                    status: "SUCCESS"
                };
                return userStatus;

            } catch(err) {
                //looked up the specific msg for unique constraint violation:
                //https://dba.stackexchange.com/questions/130108/postgresql-unique-constraint-error-message
                if (err.code === '23505') {
                    return { status: "FAILURE", error: "Username already exists!" };
                }
                return { status: "FAILURE", error: err.message };
            }
            break;
        case 'characters':
            try{
                const { fname, lname, race, class: PCClass, alignment, deity, 
                    str, dex, con, int, wis, cha, background
                 } = params;
                const newChar = await knex("characters")
                .insert({
                    fname, lname, race, class: PCClass, alignment, deity, 
                    str, dex, con, int, wis, cha, background
                })
                .returning(["id", "fname", "lname", "race", "class", "alignment", "deity", 
                "str", "dex", "con", "int", "wis", "cha", "background"])

                const charStatus = {
                    ...newChar[0],
                    status: "SUCCESS"
                };
                return charStatus;
            } catch(err) {
                res.status(500).json({ status: "FAILURE", error: err });
            }
            break;
        case 'environments':
            try{
                const { name } = params;
                const newEnv = await knex("environments")
                .insert({
                    name
                })
                .returning(["id", "name"])

                const envStatus = {
                    ...newEnv[0],
                    status: "SUCCESS"
                }
                return envStatus;
            } catch(err) {
                res.status(500).json({ status: "FAILURE", error: err });
            }
            break;
        case 'games':
            try{
                const { name, dm_id, environment_id, start_date } = params;
                const newGame = await knex("games")
                .insert({
                    name, dm_id, environment_id, start_date
                })
                .returning(["id", "name", "dm_id", "environment_id", "start_date"])

                const gameStatus = {
                    ...newGame[0],
                    status: "SUCCESS"
                }
                return gameStatus;
            } catch(err) {
                res.status(500).json({ status: "FAILURE", error: err });
            }
            break;
        case 'login':
            try{
                const user = await knex("users")
                .select('*')
                .where({ username: params.username })
                .first();

                if (user) {
                    const passMatch = await bcrypt.compare(params.password, user.password);
                    if (passMatch) {
                        console.log(`User ${params.username} auth SUCCESS.`);
                        return true;
                    }
                }
                console.log(`User ${params.username} authenticated FALSE.`);
                return false;
                
            } catch (err) {
                res.status(500).json({ authenticated: false, error: 'Login failed' });
            }
            break;
    }
}

module.exports = { 
    getAllTableEntries,
    getQueryTableEntries,
    postTableEntries
}

