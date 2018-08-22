/**
 * Change key pair (Use Case 11)
 *
 * publicKey String Send user present public key
 * no response value expected for this operation
 **/
exports.changekeysGET = function(publicKey) {
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
exports.checkcertGET = function(publicKey) {
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
exports.getmypublicGET = function(email) {
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
exports.givecertGET = function(publicKey) {
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
 * Creates a new user (Use Case 3)
 *
 * user RegObject The user to create (optional)
 * returns RegResponse
 **/
exports.registerPOST = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      privateKey: "hr483r7y84tu43ry34ut84yurh43yr348tuhrff24784hfe",
      publicKey: "yr8349r8348ur8934"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Sign new document (Use Case 5)
 *
 * signdoc SignDocObject Document to sign (optional)
 * returns SignDocResponse
 **/
exports.signdocPOST = function(signdoc) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      doc_hash: "hgur949h38th378h33h989"
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
exports.vefifyaccountGET = function(publicKey) {
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
