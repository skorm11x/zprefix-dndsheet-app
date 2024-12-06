# 3.5E Pathfinder DND SHEET
A pathfinder 1E utility application

## Description
This application makes the setup, building, and organization parts of your campaign/ adventure path simpler! Both Dungeon Masters and Player's can create, export, save, and share the artifacts you need to get to doing what you want to: playing the game!

### Functionality

#### User roles

Manager user: Dungeon Master (DM): User that can take more advanced CRUD actions on the ruleset, environment, etc. for the game.

Normal user: Player Character (PC): User that can take basic CRUD actions focused on a player character using the rulset, environment etc. setup by the game from the DM. Associated with a DM's game.

Normal user: unassigned: User that can browse available games to join and their status.

Browsing: what someone browsing the site to see character sheets people have made public, what public games are in progress there are etc. 

#### 

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
