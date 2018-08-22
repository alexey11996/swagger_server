const ChainUtil = require("../chain-util");
const { MINING_REWARD } = require("../config");

class Transaction {
  constructor() {
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, document) {
    this.outputs.push({
      document
      //address: senderWallet.publicKey
    });
    Transaction.signTransaction(this, senderWallet);
    return this;
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, document) {
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        document: document
        //address: senderWallet.publicKey
      }
    ]);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    // ---- Here we can add transaction type ----
    transaction.input = {
      timestamp: Date.now(),
      //document: senderWallet.document,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
