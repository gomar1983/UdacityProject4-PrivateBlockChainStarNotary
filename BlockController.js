const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const SimpleChain = require ('./simpleChain.js');
/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize all your endpoints here
     * @param {*} app
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", async(req, res) => {
          let blockheight = req.params.index

          SimpleChain.getBlock(req.params.index).then( block => {
            res.status(200).json(block);
        }).catch(err => {
            //res.status(404).send(`Block not found with height ${blockheight}`);
            res.send( {
              status: 'error',
              message: 'block not found'
            });
            //res.end();
          });

    });
        }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block", async(req, res) => {
        if (req.body.body){
          let block = new SimpleChain.Block(req.body.body);
          let blockDetail=await SimpleChain.addBlock(block)
          res.status(200).json(block);
          }else{
            res.send( {
              status: 'error',
              message: 'Content body not found'
            });
            }
            })

  }

    /**
     * Helper method to initialize a Mock dataset. It adds 10 test blocks to the blocks array.
     */
    initializeMockData() {
      let block = new SimpleChain.Block("Test Mock Data");
        (function theLoop (i) {
        setTimeout(() => {
          SimpleChain.addBlock(block);

            if (--i) {

            theLoop(i)

      }
        }, 100);
      })(10);

    }

}



/**
curl -v -H "Content-Type: application/json" -X POST \
     -d '{"body":"hello how r u "}' http://localhost:8000/api/block

 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => { return new BlockController(app);}
