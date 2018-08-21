const express = require("express");
const router = express.Router();

var utils = require("../utils/writer");
var Default = require("../service/DefaultService");

//router.get(`/test`, (req, res) => res.json({ msg: "default Works" }));

router.get("/changekeys", (req, res, next) => {
  var publicKey = req.query.publicKey;
  Default.changekeysGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.get("/checkcert", (req, res, next) => {
  var publicKey = req.query.publicKey;
  Default.checkcertGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/checkmysignature", (req, res) => {
  var checkmysign = req.body;
  Default.checkmysignaturePOST(checkmysign)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

module.exports.checksignaturePOST = function checksignaturePOST(
  req,
  res,
  next
) {
  var checksign = req.swagger.params["checksign"].value;
  Default.checksignaturePOST(checksign)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.checksignaturesPOST = function checksignaturesPOST(
  req,
  res,
  next
) {
  var document = req.swagger.params["document"].value;
  Default.checksignaturesPOST(document)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getdateGET = function getdateGET(req, res, next) {
  var getdate = req.swagger.params["getdate"].value;
  Default.getdateGET(getdate)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getmypublicGET = function getmypublicGET(req, res, next) {
  var email = req.swagger.params["email"].value;
  Default.getmypublicGET(email)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.givecertGET = function givecertGET(req, res, next) {
  var publicKey = req.swagger.params["publicKey"].value;
  Default.givecertGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.isdoctruePOST = function isdoctruePOST(req, res, next) {
  var isdoctrue = req.swagger.params["isdoctrue"].value;
  Default.isdoctruePOST(isdoctrue)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerPOST = function registerPOST(req, res, next) {
  var user = req.swagger.params["user"].value;
  Default.registerPOST(user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.signdocPOST = function signdocPOST(req, res, next) {
  var signdoc = req.swagger.params["signdoc"].value;
  Default.signdocPOST(signdoc)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.vefifyaccountGET = function vefifyaccountGET(req, res, next) {
  var publicKey = req.swagger.params["publicKey"].value;
  Default.vefifyaccountGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports = router;
