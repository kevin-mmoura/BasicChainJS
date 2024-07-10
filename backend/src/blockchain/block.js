const {SHA256} = require("crypto-js")

class Block {
    constructor(index = 0, lastHash = null, transactions = "Genesis Block", difficulty = 1) {
        this.index = index
        this.lastHash = lastHash
        this.transactions = transactions
        this.difficulty = difficulty
        this.timestamp = new Date()
        this.nonce = 0
        
        this.mine()
    }

    generateHash() {
        return SHA256(
            this.index + this.lastHash + JSON.stringify(this.transactions) + this.timestamp + this.nonce
        ).toString()
    }

    mine() {
        this.hash = this.generateHash()

        while (!this.hash.startsWith("0".repeat(this.difficulty))) {
            this.nonce++
            this.hash = this.generateHash()
        }
    }

    hasValidTransactions() {
        for (let i = 0; i < this.transactions.length; i++) {
            if (!this.transactions[i].isValid()) return false

            return true
        }
    }
}

module.exports = Block