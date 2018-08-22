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

  static findDoc(str, document) {
    return str.find(
      a =>
        a.data &&
        a.data.find(
          b => b.outputs && b.outputs.find(c => c.document == document)
        )
    );
  }
}

module.exports = ChainUtil;
