mongodb
rabbitmq
swagger
config
auth
debug
log application started: app name and version
rename src/docs -> src/doc
find all missing process.env. env's

---

import { readFileSync } from 'fs'
const metaData = JSON.parse(readFileSync('./package.json', 'utf8'))
