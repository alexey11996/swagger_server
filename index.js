const express = require("express");
const bodyParser = require("body-parser");
const myroutes = require(`./routes/myroutes`);

const Blockchain = require("./blockchain");
const P2pServer = require("./p2p-server");
const Signdoc = require("./Signdoc");
const TransactionPool = require("./Signdoc/transaction-pool");
const Miner = require("./miner");
const ChainUtil = require("./chain-util");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
