# UdacityProject4-PrivateBlockChainStarNotary

RESTful API using built with express node framework and it interfaces with the private blockchain.
The exposed endpoints are:

GET block
POST block

### Prerequisites

Node and NPM

### Configuring the project

- Use NPM to install all required packages

"bitcoinjs-lib": "^4.0.3",
"bitcoinjs-message": "^2.0.0",
"body-parser": "^1.18.3",
"crypto-js": "^3.1.9-1",
"curl": "^0.1.4",
"express": "^4.16.4",
"hex2ascii": "0.0.3",
"init": "^0.1.2",
"level": "^4.0.0"

- Run the express app

node app.js




### Testing the endpoints

- Post block http://localhost:8000/requestValidation

body : {"address":"1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR"}

- RESPONSE

{
    "walletAddress": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
    "requestTimeStamp": "1551761539",
    "message": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR:1551761539:starRegistry",
    "validationWindow": 300
}

- POST block http://localhost:8000/message-signature/validate

body :
{
	"address":"1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
	"signature":"H/o6zV7QOUeHQLpMdzf7mh53EPU6aVbuD4r3Ih7SibmpddT0WrPCJDiiMoZUX2beBf8L+D9P79OhC3BIaz69ous="
}
RESPONSE

{
    "registerStar": true,
    "status": {
        "address": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
        "requestTimeStamp": "1551761539",
        "message": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR:1551761539:starRegistry",
        "validationWindow": 79,
        "messageSignature": true
    }
}

================================================================================
POST block http://localhost:8000/block
body :

{
	"address":"1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
	"star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "Found star using https://www.google.com/sky/"
            }
}

RESPONSE

{
    "hash": "de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c",
    "height": 3,
    "body": {
        "address": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1551761893",
    "previousBlockHash": "75379b065d2227f422c7ec79151bc3982298b8e210d70f2a056d59cb2c0fe6d2"
}

================================================================================

POST block http://localhost:8000/block
body :

{
	"address":"1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
	"star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "Found star using https://www.google.com/sky/"
            }
}

RESPONSE

The request has expired or already used.

================================================================================

GET block http://localhost:8000/block/3

RESPONSE

{
    "hash": "de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c",
    "height": 3,
    "body": {
        "address": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1551761893",
    "previousBlockHash": "75379b065d2227f422c7ec79151bc3982298b8e210d70f2a056d59cb2c0fe6d2"
}

================================================================================
GET block http://localhost:8000/stars/hash:de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c

RESPONSE

{
    "hash": "de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c",
    "height": 3,
    "body": {
        "address": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1551761893",
    "previousBlockHash": "75379b065d2227f422c7ec79151bc3982298b8e210d70f2a056d59cb2c0fe6d2"
}

================================================================================
GET block http://localhost:8000/stars/address:1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR

RESPONSE

[
    {
        "hash": "de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c",
        "height": 3,
        "body": {
            "address": "1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "Found star using https://www.google.com/sky/"
            }
        },
        "time": "1551761893",
        "previousBlockHash": "75379b065d2227f422c7ec79151bc3982298b8e210d70f2a056d59cb2c0fe6d2"
    }
]
================================================================================

curl -X POST \
  http://localhost:8000/requestValidation \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "address":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D"
}'

RESPONSE

{"walletAddress":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D","requestTimeStamp":"1551762268","message":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D:1551762268:starRegistry","validationWindow":300}

================================================================================

curl -X POST \
  http://localhost:8000/message-signature/validate \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
"address":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D",
 "signature":"H8hWJhIp8CMz+aZvXVN664xwdEVT0etyWJQrCP0kiBA5aXHHNHfBUqQF6o5DgeQw7ByZ5QnbFytA0M6SL6yGSEY="
}'

RESPONSE

{"registerStar":true,"status":{"address":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D","requestTimeStamp":"1551762268","message":"1Ej4FTgUCrdNAooCVByDkonGtabFusEE7D:1551762268:starRegistry","validationWindow":184,"messageSignature":true}}

================================================================================

curl "http://localhost:8000/stars/hash:de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c"

RESPONSE

{"hash":"de9c8a3c3d21f42ed55c10264112f5dbaf82b6d3cab0766558a7932360e17d4c","height":3,"body":{"address":"1GCUCBd2CAVJzvjU2GDVZrWSkLaa9hL6cR","star":{"dec":"68° 52' 56.9","ra":"16h 29m 1.0s","story":"466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f","storyDecoded":"Found star using https://www.google.com/sky/"}},"time":"1551761893","previousBlockHash":"75379b065d2227f422c7ec79151bc3982298b8e210d70f2a056d59cb2c0fe6d2"}
