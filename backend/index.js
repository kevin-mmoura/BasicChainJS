const { Blockchain, Transaction } = require("./src/blockchain/blockchain.js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const chain = new Blockchain();

module.exports = { chain, Transaction, ec };

const api = require("./api.js");

const myKey = ec.genKeyPair();
const private = myKey.getPrivate("hex");
const public = myKey.getPublic("hex");

console.log(`Private Key: ${private}`);
console.log(`\nPublic Key: ${public}`);
