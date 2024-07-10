const Blockchain = require("./src/blockchain/blockchain")
const Transaction = require("./src/blockchain/transaction")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

const CONFIG = require("./config.json")

const myKey = ec.keyFromPrivate("36cde1004bc2435cb3c67b4de9d654f626e08077e6392781c866c80b7a0663af")
const myWalletAdress = myKey.getPublic("hex")

const tx1 = new Transaction(myWalletAdress, "Cleitin", 10)
tx1.signTransaction(myKey)

const chain = new Blockchain(CONFIG.DIFFICULTY, CONFIG.MINING_REWARD)

chain.addTransaction(tx1)
chain.mineBlock(myWalletAdress)
console.log(chain.getBalanceOfAdress(myWalletAdress))
chain.chain[1].transactions[0].amount = 80
console.log(`É válido?  ${chain.isValid()}`)