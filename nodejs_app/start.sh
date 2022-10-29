#!/bin/bash
PORT=$1 || 2124
HOST=0.0.0.0
ENV_FILE=".env.local"

# free the port
fuser -k $PORT/tcp

# link env
ln -f -s -T $ENV_FILE .env

#install packages
yarn install

# run (-L for container)
(nodemon -L --inspect app.js --port  $PORT  --host $HOST & wait)
#(pm2 --watch app.js --port  $PORT  --host $HOST & wait)
