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

  createTransaction(
    doc_hash,
    doc_signature,
    signers,
    blockchain,
    transactionPool
  ) {
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, doc_hash, doc_signature, signers);
    } else {
      transaction = Transaction.newTransaction(
        this,
        doc_hash,
        doc_signature,
        signers
      );
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }
}

module.exports = Signdoc;
