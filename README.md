# 3.5E Pathfinder DND SHEET
A pathfinder 1E utility application

## Description
This application makes the setup, building, and organization parts of your campaign/ adventure path simpler! Both Dungeon Masters and Player's can create, export, save, and share the artifacts you need to get to doing what you want to: playing the game!

This was a basic 2-3 full stack app as part of supra-coders SDI-28 submission requirements.

## Requirements

You will need
1. bash
2. docker
3. npm

This is a full stack app consisting of:
1. Front-end: VanillaJS ReactJS
2. Back-end: VanillaJS Express 
3. Database: Postgres

### Functionality

#### User roles

Manager user: Dungeon Master (DM): User that can take more advanced CRUD actions on the ruleset, environment, etc. for the game.

Normal user: Player Character (PC): User that can take basic CRUD actions focused on a player character using the rulset, environment etc. setup by the game from the DM. Associated with a DM's game.

Normal user: unassigned: User that can browse available games to join and their status.

Browsing: what someone browsing the site to see character sheets people have made public, what public games are in progress there are etc. 

#### Login & Registration

Users can make a Dungeon Master or Player Character account

The primary distinguisher is that only a DM can create games! Any other registered user can create assets (characters, environments etc.)
Thus, the expected behaviour is that a person being a player and a dm would make two seperate accounts. Accounts cannot have the same username.

#### Editing and viewing your items

By design only games belong to specific DM's while other assets are freely created and shared. A DM can view all of his games in the profile page at the bottom under his info as a list. It is possible a DM can edit details of a game or remove it here. All other visitors, DM's, and PCs will be able to view any details in the Games view of the website.

### Tech details

#### API
```
controller.js
```
The controller holds most of the database logic and small amounts of data validation. It is organized to have constant definitions at its top for actual table/ database parameters. This can be moved to a constants definition that can be shared across the backend in the future.

```
index.js
```
The index servers as the express root. We primarily focus around query, body, transport and connection level details and pass off logic to controllers.


#### Front-end
Front end relies on MUI for some pre-built components and styling. It has 5 basic views:
1. Profile
2. Games
3. Characters
4. Environments
5. Login

Users can view 2-3 without an account. They must register to extract extra functionality. 

## Build & Run

docker-compose and containers are setup but not operational (networking) Run these applicaitons locally.

Steps:
1. Clone the repository
2. Move into /ui and /api in two seperate shells.
3. run ```npm install``` in each shell.
4. setup database: run ```docker pull postgres:latest```
5. run:  
```
docker run --name pathfinder1e-db -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=pathfinder_sheet_db -p 5432:5432 -d postgres:latest
```
6. Create .env files in ui & api roots. These files populate our Secrets. Alternatively, just get them from dev somehow.
7. run ```npm start``` in each shell. in the api and ui folders.
8. navigate to your http://localhost:5173 to examine.

Alternatively, you can run the start.sh bash script in the root to do most of the setup to include docker database container pull, install, and database creation via:
```
bash start.sh
```
You will need docker, bash, and node/ npm on your system.

For simplified evaluation purposes, the secrets you would manually place in your .env's are also located in 
```
start.sh
```

## Roadmap

The database needs to evolve a lot of support the multitude of features and associations available in Pathfinder 1E.

For example, character's and character sheets alone involve:
1. feats
2. multitude of classes
3. favorited classes
4. custom bonuses
5. various modifiers
6. game mod backgrounds
7. equipment
8. gold
9. game state information!

This also carries over to the game, environments and other broad categories.

Ideally, the next step would be association of characters with players and letting other players/dm's create copies and edit/ delete their own. The same applies to environments. The editor should grow to be robust and fully export well defined XML or simple JSON so it can be cross used in some way and ingested into popular OSS game engine frameworks for organized play. 

In general, the UI could use a TON of love. 