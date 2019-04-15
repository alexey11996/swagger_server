const crypto = require("crypto");
const Swarm = require("discovery-swarm");
const defaults = require("dat-swarm-defaults");
const getPort = require("get-port");

const MESSAGE_TYPES = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS"
};

/**
 * Here we will save our TCP peer connections
 * using the peer id as key: { peer_id: TCP_Connection }
 */
const peers = [];
// Counter for connections, used for identify connections
let connSeq = 0;

class P2pServerNew {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
  }

  listen() {
    // Peer Identity, a random hash for identify your peer
    const myId = crypto.randomBytes(32);
    console.log("Your identity: " + myId.toString("hex"));
    /**
     * Default DNS and DHT servers
     * This servers are used for peer discovery and establishing connection
     */
    const config = defaults({
      // peer-id
      id: myId
    });

    /**
     * discovery-swarm library establishes a TCP p2p connection and uses
     * discovery-channel library for peer discovery
     */
    const sw = Swarm(config);
    (async () => {
      // Choose a random unused port for listening TCP peer connections
      const port = await getPort();

      sw.listen(port);
      console.log("Listening to port: " + port);

      /**
       * The channel we are connecting to.
       * Peers should discover other peers in this channel
       */
      sw.join("our-fun-channel");
      sw.on("connection", (conn, info) => {
        // Connection id
        const seq = connSeq;

        const peerId = info.id.toString("hex");
        console.log(`Connected #${seq} to peer: ${peerId}`);

        // Keep alive TCP connection with peer
        if (info.initiator) {
          try {
            conn.setKeepAlive(true, 600);
          } catch (exception) {
            console.log("exception", exception);
          }
        }

        conn.on("data", message => {
          const data = JSON.parse(message);
          console.log(data);
          switch (data.type) {
            case MESSAGE_TYPES.chain:
              console.log("Receive chain");
              this.blockchain.replaceChain(data.chain);
              break;
            case MESSAGE_TYPES.transaction:
              console.log("Receive transaction");
              this.transactionPool.updateOrAddTransaction(data.transaction);
              break;
            case MESSAGE_TYPES.clear_transactions:
              console.log("Receive clear transaction");
              this.transactionPool.clear();
              break;
          }
        });

        conn.on("close", () => {
          // Here we handle peer disconnection
          console.log(`Connection ${seq} closed, peer id: ${peerId}`);
          // If the closing connection is the last connection with the peer, removes the peer
          if (peers[peerId].seq === seq) {
            delete peers[peerId];
          }
        });

        // Save the connection
        if (!peers[peerId]) {
          peers[peerId] = {};
        }

        peers[peerId].conn = conn;
        peers[peerId].seq = seq;

        connSeq++;
        this.sendChain(peerId);
      });
    })();
  }

  sendChain(peer) {
    console.log("Send chain to peer", peer);
    peers[peer].conn.write(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain
      })
    );
  }

  sendTransaction(peerId, transaction) {
    console.log("Send transaction to peer ", peerId);
    peers[peerId].conn.write(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction: transaction
      })
    );
  }

  syncChains() {
    for (let id in peers) {
      this.sendChain(id);
    }
  }

  broadcastTransaction(transaction) {
    for (let id in peers) {
      this.sendTransaction(id, transaction);
    }
  }

  broadcastClearTransactions() {
    for (let id in peers) {
      peers[id].conn.write(
        JSON.stringify({
          type: MESSAGE_TYPES.clear_transactions
        })
      );
      console.log("Send clear transaction to peer ", id);
    }
  }
}

module.exports = P2pServerNew;
