const ChainUtil = require("../chain-util");
const { MINING_REWARD } = require("../config");

class Transaction {
  constructor() {
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, doc_hash, doc_signature, signers) {
    this.outputs.push({
      doc_hash,
      doc_signature,
      signers
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

  static newTransaction(senderWallet, doc_hash, doc_signature, signers) {
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        user: senderWallet.publicKey,
        doc_hash: doc_hash,
        doc_signature: doc_signature,
        signers: signers
      }
    ]);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      transaction_type: "sign_transaction",
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
