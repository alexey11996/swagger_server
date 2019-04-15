const express = require("express");
const bodyParser = require("body-parser");
const md5File = require("md5-file");
const fs = require("fs");
const Nodemailer = require("./sendmail");

const myroutes = require(`./routes/myroutes`);

const Blockchain = require("./blockchain");
//const P2pServer = require("./p2p-server");
const p2p_new = require("./p2p-server-new");
const TransactionPool = require("./Register/transaction-pool");
const Miner = require("./miner");
const ChainUtil = require("./chain-util");
var utils = require("./utils/writer");

const Register = require("./Register");
const SignDoc = require("./Signdoc");
const ChangeKeys = require("./ChangeKeys");

var app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

const bc = new Blockchain();
const tp = new TransactionPool();
//const p2pServer = new P2pServer(bc, tp);
const p2pServ = new p2p_new(bc, tp);
const miner = new Miner(bc, tp, p2pServ);

const serverPort = process.env.PORT || 3000;

app.use(`/myroutes`, myroutes);

app.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);

//p2pServer.listen();
p2pServ.listen();

// app.get("/", (req, res) => res.send("Hello!!!"));

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

// app.get("/mine", (req, res) => {
//   miner.mine();
//   res.json(bc.chain);
// });

// app.get("/register", (req, res) => {
//   res.json({ KeyPair: JSON.parse(ChainUtil.genKeyPair()) });
// });

// PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

/**
 * Check if my signature is true (Use Case 7)
 *
 * Вариант 1 - Пользователь имеет подписанные документы и меняет пару ключей
 * после этого он хочет доказать, что подпсианные документы были подпсианы именно им
 * а именно  - принадлежавшими на тот момент ему ключами, ныне утерянными/украденными и т.п.
 *
 * checkmysign CheckMySign Document for checking (optional)
 * returns CheckMySignResponse
 * 1 - Register 2 users
 * 2 - Sign Document 2 times (each user)
 * -- Request CheckMySignature - change = 0
 * 3 - Change KeyaPair for one of these users
 * 4 - Request CheckMySignature and see the result - change = 1
 **/
exports.checkmysignaturePOST = function(checkmysign, file_name) {
  return new Promise(function(resolve, reject) {
    var publicKey = checkmysign.publicKey.replace(/\\n/g, "\n").trim();
    //var privateKey = signdoc.privateKey.replace(/\\n/g, "\n").trim();
    if (ChainUtil.IfUserExists(bc.chain, publicKey) == undefined) {
      var examples = {};
      examples["application/json"] = {
        msg:
          "No sush user in the system or you signed document with old keypair"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    } else {
      //if (checkmysign.change == "0") {
      md5File("./documents/" + file_name, (err, hash) => {
        var signature = ChainUtil.ReturnDocSignature(bc.chain, hash, publicKey);
        if (signature == "-1") {
          var examples = {};
          examples["application/json"] = {
            msg: "No document signed by sudh keypair in the system"
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        } else if (signature != "-1") {
          var bool_res = ChainUtil.verifySignature(publicKey, signature, hash);
          var examples = {};
          examples["application/json"] = {
            check_status: bool_res
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        }
      });
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
      //} else if (checkmysign.change == "1") {
      // md5File("./documents/" + file_name, (err, hash) => {
      //   var signature = ChainUtil.ReturnDocSignature(
      //     bc.chain,
      //     hash,
      //     publicKey
      //   );
      //   if (signature == "-1") {
      //     var examples = {};
      //     examples["application/json"] = {
      //       msg: "No such document in the system"
      //     };
      //     if (Object.keys(examples).length > 0) {
      //       resolve(examples[Object.keys(examples)[0]]);
      //     } else {
      //       resolve();
      //     }
      //   } else if (signature != "-1") {
      /* 1-Return timestamp1 of signed doc,
            2-return timestamps of user changeKeys blocks - getTimeChanges();
            -insert timestamp1 into array of timestamps and sort the array (asc)
            -get index of signdoc timestamp in the array
            3-take timestamp from array that first before signdoc timestamp,
            (with the index before timestamp1's index)
            4-return prev_public field from checksign block with that timestamp */
      // var timestamp = ChainUtil.ReturnDateByPubKey(
      //   bc.chain,
      //   publicKey,
      //   hash
      // );
      // console.log("Timestamp of signing - " + timestamp);
      // var id = ChainUtil.findIdbyPublicKey(bc.chain, publicKey);
      // console.log("user is - " + id);
      // var timeChanges = ChainUtil.getTimeChanges(bc.chain, id);
      // console.log("TimeChanges - " + timeChanges);
      // timeChanges.push(timestamp);
      // timeChanges.sort((a, b) => a - b); // asc
      // var index = timeChanges.findIndex(timestamp);
      // var res_timestamp = timeChanges[index + 1];
      // var res_pubKey = ChainUtil.findPubKeyByCKtimestamp(
      //   bc.chain,
      //   res_timestamp
      // );
      // var bool_res = ChainUtil.verifySignature(
      //   res_pubKey,
      //   signature,
      //   hash
      // );
      // var examples = {};
      // examples["application/json"] = {
      //   check_status: bool_res
      // };
      // if (Object.keys(examples).length > 0) {
      //   resolve(examples[Object.keys(examples)[0]]);
      // } else {
      //   resolve();
      // }
      //   }
      // });
      // fs.unlink("./documents/" + file_name, function(err) {
      //   if (err) return console.log(err);
      //   console.log(`file ${file_name} deleted`);
      // });
      //}
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
    var pubkey = ChainUtil.findPubkeyByEmail(bc.chain, email);
    if (pubkey == "-1") {
      var examples = {};
      examples["application/json"] = {
        msg: "No such email in the system"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    } else if (pubkey != "-1") {
      var id = ChainUtil.findIDByEmail(bc.chain, email);
      var new_pubs = ChainUtil.findCKsByID(bc.chain, id);
      if (new_pubs == "-1") {
        var examples = {};
        examples["application/json"] = {
          publicKey: pubkey
        };
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      } else if (new_pubs != "-1") {
        var examples = {};
        examples["application/json"] = {
          latest_public_key: pubkey,
          new_pubs: new_pubs
        };
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      }

      // var newPub = ChainUtil.findCKByID(bc.chain, id);
      // if (newPub == "-1") {
      //   var resPub = pubkey.replace(/\n/g, "\\n");
      //   var examples = {};
      //   examples["application/json"] = {
      //     publicKey: resPub
      //   };
      //   if (Object.keys(examples).length > 0) {
      //     resolve(examples[Object.keys(examples)[0]]);
      //   } else {
      //     resolve();
      //   }
      // } else if (newPub != "-1") {
      //   newPub = newPub.replace(/\n/g, "\\n");
      //   var examples = {};
      //   examples["application/json"] = {
      //     latest_publicKey: newPub
      //   };
      //   if (Object.keys(examples).length > 0) {
      //     resolve(examples[Object.keys(examples)[0]]);
      //   } else {
      //     resolve();
      //   }
      // }
    }
  });
};

/**
 * Check if document is true (Use Case 10)
 *
 * isdoctrue IsDocTrue Send document for check is it true or changed since signing (optional)
 * returns IsDocTrueResponse
 **/
exports.isdoctruePOST = function(isdoctrue, file_name) {
  return new Promise(function(resolve, reject) {
    var email = isdoctrue.email;
    if (ChainUtil.IfEmailExists(bc.chain, email) == undefined) {
      console.log("Trouble");
      var examples = {};
      examples["application/json"] = {
        msg: "There is no user with such email in the system."
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    } else {
      md5File("./documents/" + file_name, (err, hash) => {
        console.log(email + " " + hash);
        var resdate = ChainUtil.ReturnDate(bc.chain, email, hash);
        if (resdate == "-1") {
          console.log("Trouble");
          var examples = {};
          examples["application/json"] = {
            msg: "There is no such doc in the system.",
            result: false
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        } else {
          var examples = {};
          examples["application/json"] = {
            msg: "Document is true",
            result: true
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        }
      });
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    }
  });
};

/**
 * Get document signature date (Use Case 9)
 *
 * getdate GetDate Send document and email (optional)
 * returns GetDateResponse
 **/
exports.getdatePOST = function(getdate, file_name) {
  return new Promise(function(resolve, reject) {
    var email = getdate.email;
    if (ChainUtil.IfEmailExists(bc.chain, email) == undefined) {
      console.log("Trouble");
      var examples = {};
      examples["application/json"] = {
        msg: "There is no user with such email in the system."
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    } else {
      md5File("./documents/" + file_name, (err, hash) => {
        console.log(email + " " + hash);
        var resdate = ChainUtil.ReturnDate(bc.chain, email, hash);
        if (resdate == "-1") {
          console.log("Trouble");
          var examples = {};
          examples["application/json"] = {
            msg: "There is no such doc in the system."
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        } else {
          var examples = {};
          examples["application/json"] = {
            date: resdate
          };
          if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
          } else {
            resolve();
          }
        }
      });
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    }
  });
};

/**
 * Check all signatures existense (Use Case 6)
 *
 * document File Check if system has all signatures for the uploaded document (optional)
 * returns List
 **/
exports.checksignaturesPOST = function(document, file_name) {
  return new Promise(function(resolve, reject) {
    md5File("./documents/" + file_name, (err, hash) => {
      var docsignersIds = ChainUtil.GetDocSignersIds(bc.chain, hash);
      var fiosByHash = ChainUtil.GetDocSignFios(bc.chain, hash);
      if (
        ChainUtil.CompareArrs(
          ChainUtil.ConvertPubKeysToIds(bc.chain, hash),
          docsignersIds
        )
      ) {
        //var fiosByIds = ChainUtil.GetDocSignFiosByIds(bc.chain, docsignersIds);
        var examples = {};
        examples["application/json"] = {
          msg: "Documents has signed by all signers!",
          fios: fiosByHash
        };
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
        fs.unlink("./documents/" + file_name, function(err) {
          if (err) return console.log(err);
          console.log(`file ${file_name} deleted`);
        });
      } else {
        var examples = {};
        examples["application/json"] = {
          msg: "Document has not signed by all signers!",
          fios: fiosByHash
        };
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
        fs.unlink("./documents/" + file_name, function(err) {
          if (err) return console.log(err);
          console.log(`file ${file_name} deleted`);
        });
      }
    });
  });
};

/**
 * Sign new document (Use Case 5)
 *
 * signdoc SignDocObject Document to sign (optional)
 * returns SignDocResponse
 **/
exports.signdocPOST = function(signdoc, file_name) {
  return new Promise(function(resolve, reject) {
    let signer = "";
    if (signdoc.signer == "0") {
      signer = "inviteSigner";
    } else if (signdoc.signer == "1") {
      signer = "firstSigner";
    }
    var publicKey = signdoc.publicKey.replace(/\\n/g, "\n").trim();
    var privateKey = signdoc.privateKey.replace(/\\n/g, "\n").trim();
    if (ChainUtil.IfUserExists(bc.chain, publicKey) == undefined) {
      console.log("Trouble!");
      var examples = {};
      examples["application/json"] = {
        msg: "No such user in the system. Check your keypair!"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
      fs.unlink("./documents/" + file_name, function(err) {
        if (err) return console.log(err);
        console.log(`file ${file_name} deleted`);
      });
    } else {
      var emailstoIds = ChainUtil.EmailsToIds(bc.chain, signdoc.signers);
      var emailstoIds_arr = emailstoIds.split(", ");
      //console.log(emailstoIds + "---- ---");
      //console.log(emailstoIds_arr);
      // Send emails to another signers in the link from email message
      if (emailstoIds == "-1") {
        console.log("Trouble with wrong emails!");
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
            //setTimeout(function() {
            //  p2pServ.broadcastTransaction(transaction);
            //}, 1000);
            //setTimeout(function() {
            //miner.mine();
            //}, 500);
            setTimeout(function() {
              p2pServ.broadcastTransaction(transaction);
              setTimeout(function() {
                miner.mine();
              }, 1000);
            }, 1000);
            var nm = new Nodemailer();
            // if false - send email, if true - from invite link,
            /*
            Отправлять эмэйлы нужно обязательно всегда в обоих случаях, но вводим доп. параметр fromInvite 
            чтобы понимать отправлять эмейл или нет
            Пример ссылки: localhost:5500?firstSigner=0&signers='email1@mailru, email2@mail2, email3@mail.ru'
            */
            if (signer == "firstSigner") {
              console.log("firstSigner");
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
            }
            if (
              ChainUtil.CountBlocksWithSameHash(bc.chain, hash) ==
              emailstoIds_arr.length
            ) {
              var convert = ChainUtil.ConvertPubKeysToIds(bc.chain, hash);
              //console.log(emailstoIds_arr);
              if (ChainUtil.CompareArrs(convert, emailstoIds)) {
                console.log("Arrays are the same");
                // nm.notifySigEnd(
                //   signdoc.signers,
                //   file_name,
                //   ChainUtil.GetDocSignFios(bc.chain, hash),
                //   file_name,
                //   "./documents/" + file_name
                // );
              }
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
        fs.unlink("./documents/" + file_name, function(err) {
          if (err) return console.log(err);
          console.log(`file ${file_name} deleted`);
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
    //console.log(user.email);
    //console.log(user.fio);
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
      //console.log(keypair);
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
      //p2pServer.broadcastTransaction(transaction);
      //setTimeout(function() {
      //  p2pServ.broadcastTransaction(transaction);
      //}, 1000);
      //setTimeout(function() {
      //miner.mine();
      //}, 1000);
      setTimeout(function() {
        p2pServ.broadcastTransaction(transaction);
        setTimeout(function() {
          miner.mine();
        }, 1000);
      }, 1000);
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
 *
 * Here must be //n !
 **/
exports.changekeysPOST = function(changekeys) {
  return new Promise(function(resolve, reject) {
    var publicKey = changekeys.publicKey.replace(/\\n/g, "\n").trim();
    var privateKey = changekeys.privateKey.replace(/\\n/g, "\n").trim();
    if (ChainUtil.IfUserExists(bc.chain, publicKey) == undefined) {
      var examples = {};
      examples["application/json"] = {
        msg: "No user with such public key in the system"
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    } else {
      //var email = ChainUtil.findEmailByPublicKey(bc.chain, publicKey);
      var keypair = JSON.parse(ChainUtil.genKeyPair());
      var new_public = keypair.pubpem.replace(/\\n/g, "\n").trim();
      const chKeys = new ChangeKeys(publicKey, privateKey);
      const transaction = chKeys.createTransaction(
        ChainUtil.findIdbyPublicKey(bc.chain, publicKey),
        publicKey,
        new_public,
        bc,
        tp
      );
      setTimeout(function() {
        p2pServ.broadcastTransaction(transaction);
      }, 1000);
      //setTimeout(function() {
      miner.mine();
      //}, 300);
      var examples = {};
      examples["application/json"] = {
        msg: "Success changing",
        new_public: keypair.pubpem,
        new_private: keypair.privpem
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
