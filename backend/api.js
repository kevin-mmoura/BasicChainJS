const http = require("http");
const url = require("url");
const { chain, Transaction, ec } = require("./index.js");
const CONFIG = require("./config.json");

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const queryParameter = parsedUrl.query;

  switch (parsedUrl.pathname) {
    case "/getBalance":
      if (queryParameter.walletAddress) {
        // Se tiver o parâmetro da carteira
        const walletAddress = queryParameter.walletAddress;

        if (isValidPublicKey(walletAddress)) {
          const balance = chain.getBalanceOfAdress(walletAddress);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ balance }));
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid wallet address");
        }
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing wallet address");
      }
      break;
    case "/mine":
      break;
    default: // Envia a blockchain inteira
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(chain));
  }
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});

function isValidPublicKey(walletAddress) {
  try {
    const key = ec.keyFromPublic(walletAddress, "hex");

    return key.validate().result;
  } catch (error) {
    return false;
  }
}
