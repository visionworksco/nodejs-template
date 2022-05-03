#!/bin/bash

set -e

export PROJECT=`node -pe "require('./package.json').name"`
export VERSION=`node -pe "require('./package.json').version"`

echo "Building" $PROJECT $VERSION "project..."

npm install
npm run build

echo "Building" $PROJECT $VERSION "project done"
