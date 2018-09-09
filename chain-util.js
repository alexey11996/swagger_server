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
  // static extractHash(data) {
  //   var documents = [];
  //   for (let a of data) {
  //     if (!a.data) {
  //       continue;
  //     }

  //     for (let b of a.data) {
  //       if (!b.outputs) {
  //         continue;
  //       }

  //       for (let c of b.outputs) {
  //         if ("document" in c) {
  //           documents.push(c.document);
  //         }
  //       }
  //     }
  //   }

  //   return documents;
  // }
  // str - bc.chain, document - md5 hash
  // static findDoc(str, document) {
  //   return str.find(
  //     a =>
  //       a.data &&
  //       a.data.find(
  //         b => b.outputs && b.outputs.find(c => c.document == document)
  //       )
  //   );
  // }
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

  static findIdbyPublicKey(str, publicKey) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].user == publicKey
        )
    );
    return res.hash;
  }

  static findPubkeyByEmail(str, email) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].email == email
        )
    );
    if (res == undefined) {
      return -1;
    } else {
      return res.data[0].outputs[0].user;
    }
  }

  static findIDByEmail(str, email) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].email == email
        )
    );
    if (res == undefined) {
      return -1;
    } else {
      return res.hash;
    }
  }

  static findCKByID(str, user_id) {
    var res = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "change_keypair" &&
            b.outputs[0].user_id == user_id
        )
    );
    console.log(res);
    if (res == undefined) {
      return -1;
    } else {
      let timestamps = [];
      for (let t of res) {
        timestamps.push(t.data[0].input.timestamp);
      }
      timestamps.sort((a, b) => b - a); // first - the biggest
      console.log(timestamps);
      var res1 = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "change_keypair" &&
              b.outputs[0].user_id == user_id &&
              a.data[0].input.timestamp == timestamps[0]
          )
      );
      return res1.data[0].outputs[0].new_public;
    }
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
    for (let i = 0; i < arr.length; i++) {
      var res = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "register_transaction" &&
              b.outputs[0].email == arr[i]
          )
      );
      try {
        id_arr.push(res.hash);
      } catch (e) {
        return -1;
      }
    }
    return id_arr.join(", ");
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

  static ReturnDate(str, email, doc_hash) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "register_transaction" &&
            b.outputs[0].email == email
        )
    );
    var pubkey = res.data[0].outputs[0].user;
    var res_1 = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].user == pubkey &&
            b.outputs[0].doc_hash == doc_hash
        )
    );
    if (res_1 == undefined) {
      return -1;
    } else {
      return res_1.data[0].input.timestamp;
    }
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

  static CountBlocksWithSameHash(str, hash) {
    var res = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash
        )
    );
    return res.length;
  }

  static GetDocSignersIds(str, hash) {
    var res = str.find(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash
        )
    );
    return res.data[0].outputs[0].signers;
  }

  static ConvertPubKeysToIds(str, hash) {
    var keypairs = [];
    var id_arr = [];
    var res_senders = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash
        )
    );

    for (let a of res_senders) {
      keypairs.push(a.data[0].input.transaction_sender);
    }

    for (let i = 0; i < keypairs.length; i++) {
      var res = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "register_transaction" &&
              b.outputs[0].user == keypairs[i]
          )
      );
      try {
        id_arr.push(res.hash);
      } catch (e) {
        return -1;
      }
    }
    return id_arr;
  }

  static GetDocSignFios(str, hash) {
    var keypairs = [];
    var id_arr = [];
    var res_senders = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash
        )
    );

    for (let a of res_senders) {
      keypairs.push(a.data[0].input.transaction_sender);
    }

    for (let i = 0; i < keypairs.length; i++) {
      var res = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "register_transaction" &&
              b.outputs[0].user == keypairs[i]
          )
      );
      try {
        id_arr.push(res.data[0].outputs[0].fio);
      } catch (e) {
        return -1;
      }
    }
    return id_arr;
  }

  static GetDocSignFiosByIds(str, ids) {
    var id_arr = ids.split(", ");
    var res_arr = [];
    for (let i = 0; i < id_arr.length; i++) {
      var res = str.find(
        a =>
          a.hash == id_arr[i] &&
          a.data.find(b => b.input.transaction_type == "register_transaction")
      );
      try {
        res_arr.push(res.data[0].outputs[0].fio);
      } catch (e) {
        return -1;
      }
    }
    return res_arr;
  }

  static ConvertPubKeysToIds(str, hash) {
    var keypairs = [];
    var id_arr = [];
    var res_senders = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash
        )
    );

    for (let a of res_senders) {
      keypairs.push(a.data[0].input.transaction_sender);
    }

    for (let i = 0; i < keypairs.length; i++) {
      var res = str.find(
        a =>
          a.data &&
          a.data.find(
            b =>
              b.input.transaction_type == "register_transaction" &&
              b.outputs[0].user == keypairs[i]
          )
      );
      try {
        id_arr.push(res.hash);
      } catch (e) {
        return -1;
      }
    }
    return id_arr.join(", ");
  }

  static CompareArrs(arr1, arr2) {
    var arr1_n = arr1.split(", ");
    var arr2_n = arr2.split(", ");
    //console.log(arr1_n + "  " + arr2_n);
    if (
      arr1_n.length == arr2_n.length &&
      arr1_n.every(v => arr2_n.indexOf(v) >= 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  static CountblocksFromOneSigner(str, hash, signature) {
    var res = str.filter(
      a =>
        a.data &&
        a.data.find(
          b =>
            b.input.transaction_type == "sign_transaction" &&
            b.outputs[0].doc_hash == hash &&
            b.outputs[0].doc_signature == signature
        )
    );
    return res.length;
  }
}

module.exports = ChainUtil;
