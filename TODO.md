mongodb
rabbitmq
swagger
config
auth
pm2
debug
update tsconfig, tsconfig.build in other projects
add 'compile:diagnostics'script to other projects
update 'test' scripts in other projects
.npmrc + package.json's "engines" in other projects
update prettier and eslint in other projects
update nodemon config in other projects
update .lintstagedrc in other projects
log application started: app name and version
rename src/docs -> src/doc
find all missing process.env. env's
github templates
refresh token

---

import { readFileSync } from 'fs'
const metaData = JSON.parse(readFileSync('./package.json', 'utf8'))
