#! /bin/bash

API_BASE_URL="http://localhost:3000"

echo "Testing /users endpoint"
curl -X POST "${API_BASE_URL}/users" \
  -H "Content-Type: application/json" \
  -d '{
    "fname": "John",
    "lname": "Doe",
    "handle": "johnd",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": 1
  }'

echo -e "\n\nTesting /characters endpoint"
curl -X POST "${API_BASE_URL}/characters" \
  -H "Content-Type: application/json" \
  -d '{
    "fname": "Aragorn",
    "lname": "Elessar",
    "race": "Human",
    "class": "Ranger",
    "alignment": "Lawful Good",
    "deity": "Iluvatar",
    "str": 18,
    "dex": 16,
    "con": 15,
    "int": 14,
    "wis": 16,
    "cha": 17,
    "background": "Exile"
  }'

echo -e "\n\nTesting /environments endpoint"
curl -X POST "${API_BASE_URL}/environments" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Misty Mountains"
  }'

echo -e "\n\nTesting /games endpoint"
curl -X POST "${API_BASE_URL}/games" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Fellowship of the Ring",
    "dm_id": 1,
    "environment_id": 1,
    "start_date": "2023-12-05 14:31:00+00"
  }'

echo -e "\n\nTesting correct /login endpoint"
curl -X POST "${API_BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword"
  }'

echo -e "\n\nTesting incorrect /login endpoint"
curl -X POST "${API_BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "yolo420"
  }'