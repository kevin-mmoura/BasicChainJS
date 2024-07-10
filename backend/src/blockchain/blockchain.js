const Block = require("./block");
const Transaction = require("./transaction");

class Blockchain {
  constructor(difficulty = 1, miningReward) {
    this.chain = [new Block()];
    this.index = 1;
    this.pendingTransactions = [];
    this.miningReward = miningReward;

    this.difficulty = difficulty;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineBlock(miningRewardAddress) {
    const index = this.index;
    const lastHash = this.getLastBlock().hash;

    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      index,
      lastHash,
      this.pendingTransactions,
      this.difficulty
    );

    this.index++;
    this.chain.push(block);
    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }

    if (!transaction.isValid()) {
      throw new Error("Transaction is not valid");
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAdress(address) {
    let balance = 0;
    for (let i = 0; i < this.chain.length; i++) {
      // Percorre cada Bloco
      for (let j = 0; j < this.chain[i].transactions.length; j++) {
        // Percorre cada transação do bloco
        const trans = this.chain[i].transactions[j];

        if (trans.fromAddress === address) balance -= trans.amount;
        if (trans.toAddress === address) balance += trans.amount;
      }
    }
    return balance;
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const lastBlock = this.chain[i - 1];
      const currentBlock = this.chain[i];

      /*
            [SE NÃO TEM TRANSAÇÕES VALIDAS]
            [SE O HASH NÃO ESTÁ CORRETO]
            [SE O INDEX ESTÁ DIFERENTE (A ORDEM)
            [SE O HASH DO ULTIMO BLOCO ESTA DIFERENTE NO BLOCO ATUAL]]
            */

      if (!currentBlock.hasValidTransactions()) return false;
      if (currentBlock.hash !== currentBlock.generateHash()) return false;
      if (currentBlock.index !== lastBlock.index + 1) return false;
      if (currentBlock.lastHash !== lastBlock.hash) return false;
    }
    return true;
  }
}

module.exports = { Blockchain: Blockchain, Transaction: Transaction };
