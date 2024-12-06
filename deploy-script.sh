#!/bin/bash


git add . 
git commit -m "Atualização de código e ambiente"
git push origin main 

git pull origin main

docker-compose down  

docker-compose up -d
