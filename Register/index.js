const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class Register {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  sign(dataHash) {
    return ChainUtil.signData(dataHash, this.privateKey);
  }

  createTransaction(mobilePhone, email, fio, blockchain, transactionPool) {
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, mobilePhone, email, fio);
    } else {
      transaction = Transaction.newTransaction(this, mobilePhone, email, fio);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }
}

module.exports = Register;
