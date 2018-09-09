const ChainUtil = require("../chain-util");
const { MINING_REWARD } = require("../config");

class Transaction {
  constructor() {
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, user_id, prev_public, new_public) {
    this.outputs.push({
      user_id,
      prev_public,
      new_public
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

  static newTransaction(senderWallet, user_id, prev_public, new_public) {
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        user_id: user_id,
        prev_public: prev_public,
        new_public: new_public
      }
    ]);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      transaction_type: "change_keypair",
      transaction_sender: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.transaction_sender,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
