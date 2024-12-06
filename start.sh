#!/bin/bash

echo "pulling postgres to start database.."
docker pull postgres:latest

echo "start postgres db..."
docker run --name pathfinder1e-db \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=docker \
    -e POSTGRES_DB=pathfinder_sheet_db \
    -p 5432:5432 \
    -d postgres:latest

# however long postgres takes wild guess
sleep 10

echo "making pathfinder1e-db container with database: pathfinder_sheet_db"
docker exec -it pathfinder1e-db psql -U postgres -c "CREATE DATABASE pathfinder_sheet_db;"

# https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html
# for how to delimet, in this case by the end of line carraige return per entry
echo "create the .env files per app part..."
cat <<EOL > ./ui/.env
VITE_API_SERVER_BASE=http://localhost:3000
EOL

cat <<EOL > ./api/.env
DB_CONNECTION_STRING=postgresql://postgres:docker@0.0.0.0:5432/pathfinder_sheet_db
POSTGRES_PASSWORD=docker
ENVIRONMENT=development
EOL

bash -c "cd ./ui && npm install;" &
bash -c "cd ./api && npm install;" &

echo "You can start apps with npm start in /ui and /api respectively. Docker database should be running"