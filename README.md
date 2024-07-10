# BasicChainJS

## Introdução

BasicChainJS é uma implementação simples de blockchain em Node.js utilizando o algoritmo SHA-256. Inclui funcionalidades fundamentais como a criação de blocos, manipulação de transações, mineração e validação da blockchain.

## Funcionalidades

- Criação de Blocos: Criação de novos blocos com prova de trabalho (Proof of Work).
- Transações: Adição e validação de transações entre endereços.
- Mineração: Mineração de novos blocos para adicionar à blockchain.
- Cálculo de Saldo: Cálculo do saldo de qualquer endereço.
- Validação: Garantia da integridade da blockchain.

## Tecnologias Utilizadas

- Node.js
- Crypto-js para hashing
- Elliptic para funções criptográficas

## Instalação

Para começar a usar o BasicChainJS, siga os passos abaixo:

```bash
git clone https://github.com/kevin-mmoura/BasicChainJS.git
cd BasicChainJS
cd backend
npm install
```

## Exemplos de uso

### Criando seu par de chaves
```Js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair();
```

### O objeto myKey contém sua chave pública e privada
```Js
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```

### Criando a blockchain
```Js
const {Blockchain, Transaction} = require("./src/blockchain/blockchain")
const CONFIG = require("./config.json")

const chain = new Blockchain(CONFIG.DIFFICULTY, CONFIG.MINING_REWARD)
```

### Fazendo uma transação
```Js
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("Sua chave privada");
const myWalletAddress = myKey.getPublic("hex");

const tx1 = new Transaction(myWalletAddress, "Outro endereço de carteira", 10);
tx1.signTransaction(myKey);

chain.addTransaction(tx1);
```

### Minerando um bloco (Beta)
```Js
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

const myKey = ec.keyFromPrivate("Sua chave privada")
const myWalletAdress = myKey.getPublic("hex")

chain.mineBlock(myWalletAdress)
```

### Obtendo o saldo de um endereço
```Js
const {Blockchain, Transaction} = require("./src/blockchain/blockchain")
const CONFIG = require("./config.json")

const chain = new Blockchain(CONFIG.DIFFICULTY, CONFIG.MINING_REWARD)
console.log(chain.getBalanceOfAdress("Endereço público da carteira"))
```

- EM BREVE IREI CRIAR O FRONTEND! :)
