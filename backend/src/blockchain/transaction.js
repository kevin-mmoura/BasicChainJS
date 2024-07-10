const { SHA256 } = require("crypto-js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;

    this.timestamp = new Date();
  }

  generateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      // Apenas quem enviou pode assinar
      throw new Error("You cannot sign transactions for other wallets!");
    }

    const haxTx = this.generateHash();
    const sig = signingKey.sign(haxTx, "base64");

    this.signature = sig.toDER("hex");
  }

  isValid() {
    // Caso seja nulo será considerado valido, porque foi a recompensa da mineraçao
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.generateHash(), this.signature);
  }
}

module.exports = Transaction;
