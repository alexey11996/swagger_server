const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class ChangeKeys {
  constructor(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  sign(dataHash) {
    return ChainUtil.signData(dataHash, this.privateKey);
  }

  createTransaction(
    user_id,
    prev_public,
    new_public,
    blockchain,
    transactionPool
  ) {
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, user_id, prev_public, new_public);
    } else {
      transaction = Transaction.newTransaction(
        this,
        user_id,
        prev_public,
        new_public
      );
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }
}

module.exports = ChangeKeys;
