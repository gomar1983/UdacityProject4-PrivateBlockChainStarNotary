/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/
const SHA256 = require('crypto-js/sha256');
const level = require('level');
const chainDB = './ProjectLevelDB';
const db = level(chainDB);
/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/
class Block{
	constructor(data){
     this.hash = "",
     this.height = 0,
     this.body = data,
     this.time = 0,
     this.previousBlockHash = ""
    }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
    constructor (body)
      {
         addBlock(new Block(body));
      }
}
// ~~~~ Adding new block ~~~~
async function addBlock(newBlock){

    newBlock.height=await getBlockHeight(); //setting new block height
    if(newBlock.height == 0)
    { newBlock.previousBlockHash=0;//setting previousblockhash for genesis block
			newBlock.body="Genesis block in the Block chain";
      console.log("Block chain need genesis Block ...!!!! ", newBlock.height);}
  if(newBlock.height > 0)
  {
    let obj=await getBlock(newBlock.height-1);//setting previousblockhash from old block
    newBlock.previousBlockHash=obj.hash;//setting previousblockhash for the block
  }
  console.log("newBlock.previousBlockHash: ",newBlock.previousBlockHash);
			newBlock.time = new Date().getTime().toString().slice(0,-3);//setting datetime for the block
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();//setting Hash for the block
			//Add block to Level DB
			addDataToLevelDB(newBlock.height, JSON.stringify(newBlock)).then((result) => {
      if(!result) {console.log("Error Adding data");
      }else {
        return result;
        console.log("RESULT ",result);}
      }).catch((err) => { console.log(err); });

}


// ~~~~ Get Block from Level DB ~~~~
async function getBlock(blockHeight){
  return JSON.parse(await getBlockFromLevelDB(blockHeight));
  }

  function getBlockFromLevelDB( key ) {
 return new Promise((resolve, reject) => {
       db.get( key, (error, value) =>{
         if (error){
           reject(error)
       }
        resolve(value)
      })
    })
  }


// ~~~~ Get Block Height from Level DB ~~~~
async function getBlockHeight() {
  return await getBlockHeightFromDB()

}

 function  getBlockHeightFromDB() {
		return new Promise(function(resolve, reject) {
		 let count = 0;
		 db.createReadStream().on('data', function(data) {
		    count++;
		    console.log("Block no. : ",count);
		     })
		     .on('error', function(err) {
		       reject(err);
		    })
		    .on('close', function() {
		      resolve(count);
		      console.log("Number of blocks found in LevelDB : ",count);
    })
  });
}

// ~~~~ Adding data to Level DB ~~~~

function addDataToLevelDB(key, value) {
    return new Promise(function(resolve, reject) {
        db.put(key, value, function(err) {
            if (err) {
                console.log('Block ' + key + ' submission failed', err);
                reject(err);
            }
            resolve(value);
        });
    });
}




// ~~~~ Validating Block ~~~~

function validateBlock(i) {
// get block
db.get(i).then(function(result) {
let obj = JSON.parse(result)
let blockHash=obj.hash;
// remove block hash to test block integrity
obj.hash = '';
// generate block hash
let validBlockHash = SHA256(JSON.stringify(obj)).toString();
console.log("validBlockHash : ",validBlockHash);
// Compare
if (blockHash===validBlockHash) {
console.log("Block no "+i+" is valid");
return true;
} else {
console.log('Block #'+i+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
return false;
}
}	)
}

// ~~~~ Validating Block Chain ~~~~

async function validateChain(){
    let errorLog = [];

    let isBlockValid = false;
    const height = await getBlockHeightFromDB()
      console.log('blockHeight - ' + height);
      for (var i =0; i < height-1; i++) {
       if (!validateBlock(i))errorLog.push(i);
            let curBlock = getBlock(i);
            let nextBlock = getBlock(i+1);
            let blockHash = curBlock.hash;
            let previousHash = nextBlock.previousBlockHash;
						//compare if previousBlockHash and block hash are same
						if (blockHash!==previousHash) {

              errorLog.push(i)
              console.log('Chain --Block #'+i+' invalid hash:\n'+previousHash+'<>'+block.previousBlockHash);
            }
          }
                if (errorLog.length>0) {
                console.log('Block errors = ' + errorLog.length);
                console.log('Blocks: '+errorLog);
            } else {
                console.log('No errors detected');
              }


      }

      module.exports = {
        getBlock: getBlock,
        addBlock:addBlock ,
        Block:Block
      }



//let blockchain = new Blockchain();
//let a =getBlock(2);

//addBlock(new Block("Second"));

/*
 (function theLoop (i) {
   setTimeout(() => {
     addBlock(new Block("Second"));

       if (--i) {

       theLoop(i)

 }
   }, 100);
 })(10);

validateChain()*/
