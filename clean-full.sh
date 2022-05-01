#!/bin/bash

set -e

export PACKAGE="package.json:"
export NAME=`node -pe "require('./package.json').name"`
export REPO_URL=`node -pe "require('./package.json').repository.url"`
export BUGS_URL=`node -pe "require('./package.json').bugs.url"`
export README="README.md"

sudo rm -rf dist
rm -rf coverage
rm -rf node_modules
rm -rf CHANGELOG.md
rm -rf package-lock.json
rm -rf tsconfig.tsbuildinfo
rm -rf tsconfig.build.tsbuildinfo
rm -rf .git
git init

echo "Manually update:"
echo $PACKAGE $NAME
echo $PACKAGE $REPO_URL
echo $PACKAGE $BUGS_URL
echo $README
