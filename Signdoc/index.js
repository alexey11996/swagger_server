//const { INITIAL_BALANCE } = require("../config");
const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class Signdoc {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  sign(dataHash) {
    return ChainUtil.signData(dataHash, this.privateKey);
  }

  createTransaction(document, blockchain, transactionPool) {
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, document);
    } else {
      transaction = Transaction.newTransaction(this, document);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }
}

module.exports = Signdoc;
