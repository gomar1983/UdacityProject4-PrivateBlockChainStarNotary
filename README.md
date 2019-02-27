RESTful API using built with express node framework and it interfaces with the private blockchain.
The exposed endpoints are:

GET block
POST block

### Prerequisites

Node and NPM

### Configuring the project

- Use NPM to install all required packages
```
npm install
--body-parser
--crypto-js
--curl
--express
--level
```
- Run the express app
```
node app.js
```





### Testing the endpoints

GET block
```
curl -X GET http://localhost:8000/block/0/
```

RESPONSE

```
// if the block exists
{
    "hash": "91454a5a2ad997d5104026e5f69d9b8cda41ee9110a40a5fca8dffee6548abc7",
    "height": 0,
    "body": "Genesis block in the Block chain",
    "time": "1551250133",
    "previousBlockHash": 0
}

// if the block does not exist
{
    "status": "error",
    "message": "block not found"
}
```

POST block

when data is not empty
```
curl -X POST -H "Content-Type: application/json" --data '{"body": "Testing block with test string data"}' http://localhost:8000/block/ | python -m json.tool
```

RESPONSE
```
{
    "hash": "e70a008d3a71b9dc0e4214d33595344a2db6106f940af2ebdb4dfae301c49d98",
    "height": 102,
    "body": "Testing block with test string data",
    "time": "1551285191",
    "previousBlockHash": "1f77c3c9ff6c82b11e3b7a55b16493607e5ba32de41e9fd1d0de97b243a97aea"
}
```

when data is empty
```
curl -X POST  http://localhost:8000/block/
```

RESPONSE
```
{
    "status": "error",
    "message": "Content body not found"
}
```

POST for message signature validation

Three use cases

1. when address is not validated
```
curl -X POST http://localhost:8000/message-signature/validate \
     -H "Content-Type: application/json" \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "signature": "H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU="
}' \
    | python -m json.tool
```

RESPONSE
```
{
    "hash": "8e9be6024ba57256ccb5e2f72735ac86359c017a2385c02eea3a91adb0218ca3",
    "height": 3,
    "body": "this is raw data",
    "time": "1539196720",
    "previousBlockHash": "0bc0bcf60b0e4b5f42dec061946e8d21a0f140263b9b8685d4e74e123f4ef8cc"
}
```

when data is empty
```
curl -X POST  http://localhost:8000/block/
```

RESPONSE
```
{
    "status": "error",
    "message": "block data is missing"
}
```
