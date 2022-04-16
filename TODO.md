rabbitmq
swagger
config
log application started: app name and version
rename src/docs -> src/doc
find all missing process.env. var's
check all Config.get, types for Config.get

---

import { readFileSync } from 'fs'
const metaData = JSON.parse(readFileSync('./package.json', 'utf8'))
