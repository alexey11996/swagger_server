const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var utils = require("../utils/writer");
var Default = require("../index");

const storage = multer.diskStorage({
  destination: "./documents",
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
});

//router.get(`/test`, (req, res) => res.json({ msg: "default Works" }));

router.post("/signdoc", upload.single("document"), (req, res, next) => {
  var signdoc = req.body;
  Default.signdocPOST(signdoc, req.file.filename)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response, 202);
    });
});

router.post("/register", (req, res, next) => {
  var user = req.body;
  Default.registerPOST(user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/changekeys", (req, res, next) => {
  var publicKey = req.body.publicKey;
  Default.changekeysPOST(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/checkcert", (req, res, next) => {
  var publicKey = req.body.publicKey;
  Default.checkcertPOST(publicKey)
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

router.post("/getmypublic", (req, res, next) => {
  var email = req.body.publicKey;
  Default.getmypublicPOST(email)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

router.post("/givecert", (req, res, next) => {
  var publicKey = req.body.publicKey;
  Default.givecertPOST(publicKey)
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

router.post("/vefifyaccount", (req, res, next) => {
  var publicKey = req.body.publicKey;
  Default.vefifyaccountPOST(publicKey)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
});

module.exports = router;
