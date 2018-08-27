const express = require("express");
const bodyParser = require("body-parser");
const md5File = require("md5-file");
const Nodemailer = require("./sendmail");

const myroutes = require(`./routes/myroutes`);

const Blockchain = require("./blockchain");
const P2pServer = require("./p2p-server");
const TransactionPool = require("./Register/transaction-pool");
const Miner = require("./miner");
const ChainUtil = require("./chain-util");
var utils = require("./utils/writer");

const Register = require("./Register");
const SignDoc = require("./Signdoc");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

const bc = new Blockchain();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, p2pServer);

const serverPort = process.env.PORT || 8080;

app.use(`/myroutes`, myroutes);

app.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);

p2pServer.listen();

app.get("/", (req, res) => res.send("Hello!!!"));

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.get("/register", (req, res) => {
  res.json({ KeyPair: JSON.parse(ChainUtil.genKeyPair()) });
});

// PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

/**
 * Sign new document (Use Case 5)
 *
 * signdoc SignDocObject Document to sign (optional)
 * returns SignDocResponse
 **/
exports.signdocPOST = function(signdoc, file_name) {
  return new Promise(function(resolve, reject) {
    var publicKey = signdoc.publicKey.replace(/\\n/g, "\n").trim();
    var privateKey = signdoc.privateKey.replace(/\\n/g, "\n").trim();
    if (ChainUtil.IfUserExists(bc.chain, publicKey) == undefined) {
      console.log("Trouble!");
      var examples = {};
      examples["application/json"] = {
        msg: "No such user in the system. Check your public key!"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    } else {
      var emailstoIds = ChainUtil.EmailsToIds(bc.chain, signdoc.signers);
      // Send emails to another signers in link from email message
      if (emailstoIds == -1) {
        console.log("Trouble!");
        var examples = {};
        examples["application/json"] = {
          msg:
            "There is no one or several emails in the system. Check your email list again!"
        };
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      } else {
        md5File("./documents/" + file_name, (err, hash) => {
          var signature = ChainUtil.signData(hash, privateKey);
          if (
            ChainUtil.CountblocksFromOneSigner(bc.chain, hash, signature) >= 1
          ) {
            console.log("Trouble!");
            var examples = {};
            examples["application/json"] = {
              msg: "You cannot sign one document 2+ times!"
            };
            if (Object.keys(examples).length > 0) {
              resolve(examples[Object.keys(examples)[0]]);
            } else {
              resolve();
            }
          } else {
            const sign = new SignDoc(publicKey, privateKey);
            const transaction = sign.createTransaction(
              hash,
              signature,
              emailstoIds,
              bc,
              tp
            );
            p2pServer.broadcastTransaction(transaction);
            miner.mine();
            var nm = new Nodemailer();

            var recip = signdoc.signers.split(", ");
            recip = ChainUtil.removeArrayItem(
              recip,
              ChainUtil.findEmailByPublicKey(bc.chain, publicKey)
            );
            // nm.notifySigners(
            //   ChainUtil.findFIOByPublicKey(bc.chain, publicKey),
            //   file_name,
            //   recip,
            //   file_name,
            //   "./documents/" + file_name
            // );

            //console.log(ChainUtil.CountBlocksWithSameHash(bc.chain, hash));
            if (
              ChainUtil.CountBlocksWithSameHash(bc.chain, hash) ==
              emailstoIds.length
            ) {
              //console.log(ChainUtil.GetDocSignFios(bc.chain, hash));
              nm.notifySigEnd(
                signdoc.signers,
                file_name,
                ChainUtil.GetDocSignFios(bc.chain, hash),
                file_name,
                "./documents/" + file_name
              );
            }
            var examples = {};
            examples["application/json"] = {
              doc_hash: hash
            };
            if (Object.keys(examples).length > 0) {
              resolve(examples[Object.keys(examples)[0]]);
            } else {
              resolve();
            }
          }
        });
      }
    }
  });
};

/**
 * Creates a new user (Use Case 3)
 *
 * user RegObject The user to create (optional)
 * returns RegResponse
 **/
exports.registerPOST = function(user) {
  return new Promise(function(resolve, reject) {
    if (ChainUtil.IfEmailExists(bc.chain, user.email) !== undefined) {
      console.log("Trouble!");
      var examples = {};
      examples["application/json"] = {
        msg: "There is already such email in the system! Try another email"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    } else {
      var keypair = JSON.parse(ChainUtil.genKeyPair());

      var publicKey = keypair.pubpem.replace(/\\n/g, "\n").trim();
      var privateKey = keypair.privpem.replace(/\\n/g, "\n").trim();

      const reg = new Register(publicKey, privateKey);
      const transaction = reg.createTransaction(
        user.mobilePhone,
        user.email,
        user.fio,
        bc,
        tp
      );
      p2pServer.broadcastTransaction(transaction);
      miner.mine();
      var examples = {};
      examples["application/json"] = {
        privateKey: keypair.privpem,
        publicKey: keypair.pubpem
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    }
  });
};

/**
 * Change key pair (Use Case 11)
 *
 * publicKey String Send user present public key
 * no response value expected for this operation
 **/
exports.changekeysPOST = function(publicKey) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};

/**
 * Verify if certification authority user is true (Use Case 2.1)
 *
 * publicKey String Send searched certification user publicKey
 * returns inline_response_200_2
 **/
exports.checkcertPOST = function(publicKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    var test = true;
    examples["application/json"] = {
      checkresult: test
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Check if my signature is true (Use Case 7)
 *
 * checkmysign CheckMySign Document for checking (optional)
 * returns CheckMySignResponse
 **/
exports.checkmysignaturePOST = function(checkmysign) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      check_status: false
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Check if foreign signature is true (Use Case 8)
 *
 * checksign CheckSign Document for checking (optional)
 * returns CheckSignResponse
 **/
exports.checksignaturePOST = function(checksign) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      check_status: false
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Check all signatures existense (Use Case 6)
 *
 * document File Check if system has all signatures for the uploaded document (optional)
 * returns List
 **/
exports.checksignaturesPOST = function(document) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = ["", ""];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get document signature date (Use Case 9)
 *
 * getdate GetDate Send document and email (optional)
 * returns GetDateResponse
 **/
exports.getdatePOST = function(getdate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: "54375855439857 // timestamp"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Show my public key (Use Case 12)
 *
 * email String Send user email
 * returns inline_response_200_3
 **/
exports.getmypublicPOST = function(email) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      publicKey: "ufh38fh348r834ugh845g84h94k0"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Give certification authority to user (Use Case 1)
 *
 * publicKey String Send user publicKey
 * returns inline_response_200
 **/
exports.givecertPOST = function(publicKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      msg:
        "Request has been sent. Wait for admin response | No user with such publicKey in the system. Check your publickey"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Check if document is true (Use Case 10)
 *
 * isdoctrue IsDocTrue Send document for check is it true or changed since signing (optional)
 * returns IsDocTrueResponse
 **/
exports.isdoctruePOST = function(isdoctrue) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: false
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Verify user account (Use Case 2)
 *
 * publicKey String Send user publicKey
 * returns inline_response_200_1
 **/
exports.vefifyaccountPOST = function(publicKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      msg: "Request has been sent. Wait for admin response"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
