#!/bin/bash

set -e

# App declaration
export NODE_ENV=${NODE_ENV:=development}
export PROJECT=`node -pe "require('./package.json').name"`
export PORT=${PORT:=8080}
export INSTANCES=1

echo "pm2: starting" $PROJECT "service on port" $PORT "in environment" $ENO_ENV"..."

# remove a success status from a previous run
if [ -r .success ]; then rm .success; fi

# stop an old instance
pm2 delete $PROJECT &> /dev/null || true

# app setup
npm run setup:app

# start a new instance
pm2 start ./dist/app/index.js -i ${INSTANCES} --name="$PROJECT" --log-type json --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z"

# log a success status
touch .success
echo "pm2:" $PROJECT "service started on port" $PORT "in environment" $ENO_ENV
