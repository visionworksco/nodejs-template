Terminal 1:

- with a valid message:

```
NODE_ENV=development.local DEBUG=true ts-node src/app/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -valid
```

- with an invalid message:

```
NODE_ENV=development.local DEBUG=true ts-node src/app/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -invalid
```
