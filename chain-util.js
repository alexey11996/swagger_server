const SHA256 = require("crypto-js/sha256");
//const uuidV1 = require("uuid/v1");
const ursa = require("ursa");
const crypto = require("crypto");

class ChainUtil {
  static genKeyPair() {
    var key = ursa.generatePrivateKey(1024, 65537);
    var privpem = key
      .toPrivatePem()
      .toString()
      .replace(/\n/g, "\\n");
    var pubpem = key
      .toPublicPem()
      .toString()
      .replace(/\n/g, "\\n");

    return JSON.stringify({ privpem: privpem, pubpem: pubpem });
  }

  // static id() {
  //   return uuidV1();
  // }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    const verify = crypto.createVerify("SHA256");
    verify.update(dataHash);
    return verify.verify(publicKey, signature, "hex");
  }

  static signData(data, privateKey) {
    const sign = crypto.createSign("SHA256");
    sign.update(data);
    return sign.sign(privateKey, "hex");
  }
  //Hashes list, data - bc.chain
  static extractHash(data) {
    var documents = [];
    for (let a of data) {
      if (!a.data) {
        continue;
      }

      for (let b of a.data) {
        if (!b.outputs) {
          continue;
        }

        for (let c of b.outputs) {
          if ("document" in c) {
            documents.push(c.document);
          }
        }
      }
    }

    return documents;
  }
  // str - bc.chain, document - md5 hash
  static findDoc(str, document) {
    return str.find(
      a =>
        a.data &&
        a.data.find(
          b => b.outputs && b.outputs.find(c => c.document == document)
        )
    );
  }
  //str - blockchain chain
  static findFIOByPublicKey(str, publicKey) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].user == publicKey
        )
    );
    return res.data[0].outputs[0].fio;
  }

  static findEmailByPublicKey(str, publicKey) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].user == publicKey
        )
    );
    return res.data[0].outputs[0].email;
  }

  static EmailsToIds(str, params) {
    var arr = params.split(", ");
    var id_arr = [];
    for (i = 0; i < arr.length; i++) {
      var res = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "register_transaction" &&
              b.outputs[0].email == arr[i]
          )
      );
      id_arr.push(res.hash);
    }
    return id_arr;
  }

  static IfUserExists(str, publicKey) {
    return str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].user == publicKey
        )
    );
  }

  static IfEmailExists(str, email) {
    return str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].email == email
        )
    );
  }
  // For use removeArrayItem(arrayName, ElementValue)
  static removeArrayItem(arr) {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
}

module.exports = ChainUtil;
