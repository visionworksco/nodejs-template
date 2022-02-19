Terminal 1:

with a valid message:

```
ts-node src/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -valid
NODE_ENV=production ENO_ENV=dev DEBUG=true ts-node src/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -valid
```

with an invalid message:

```
ts-node src/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -invalid
NODE_ENV=production ENO_ENV=dev DEBUG=true ts-node src/api/ampq/ampqCmdExchange/bin/ProduceToCmdExchange.ts -invalid
```
