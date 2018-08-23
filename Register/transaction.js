const ChainUtil = require("../chain-util");
const { MINING_REWARD } = require("../config");

class Transaction {
  constructor() {
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, mobilePhone, email, fio) {
    this.outputs.push({
      mobilePhone,
      email,
      fio
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

  static newTransaction(senderWallet, mobilePhone, email, fio) {
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        mobilePhone: mobilePhone,
        email: email,
        fio: fio,
        user: senderWallet.publicKey
      }
    ]);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      transaction_type: "register_transaction",
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
