const {Blockchain, Transaction} = require("./src/blockchain/blockchain")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

const CONFIG = require("./config.json")

const myKey = ec.keyFromPrivate("SUA CHAVE PRIVADA")
const myWalletAdress = myKey.getPublic("hex")

const tx1 = new Transaction(myWalletAdress, "Pedro", 10)
tx1.signTransaction(myKey)

const chain = new Blockchain(CONFIG.DIFFICULTY, CONFIG.MINING_REWARD)

chain.addTransaction(tx1)
chain.mineBlock(myWalletAdress)
console.log(chain.getBalanceOfAdress(myWalletAdress))
