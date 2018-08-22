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
      if (response.checkresult == true) {
        utils.writeJson(res, response);
      } else {
        utils.writeJson(res, response, 202);
      }
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

router.post("/checksignature", (req, res, next) => {
  var checksign = req.body;
  Default.checksignaturePOST(checksign)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/checksignatures", (req, res, next) => {
  var document = req.body;
  Default.checksignaturesPOST(document)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/getdate", (req, res, next) => {
  var getdate = req.body;
  Default.getdatePOST(getdate)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.get("/getmypublic", (req, res, next) => {
  var email = req.query.publicKey;
  Default.getmypublicGET(email)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.get("/givecert", (req, res, next) => {
  var publicKey = req.query.publicKey;
  Default.givecertGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/isdoctrue", (req, res, next) => {
  var isdoctrue = req.body;
  Default.isdoctruePOST(isdoctrue)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/register", (req, res, next) => {
  var user = req.swagger.params["user"].value;
  Default.registerPOST(user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/signdoc", (req, res, next) => {
  var signdoc = req.body;
  Default.signdocPOST(signdoc)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.get("/vefifyaccount", (req, res, next) => {
  var publicKey = req.query.publicKey;
  Default.vefifyaccountGET(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

module.exports = router;
