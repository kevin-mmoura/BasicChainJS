require("dotenv").config();
const http = require("http");
const url = require("url");
const { chain } = require("./index");
const { Transaction } = require("./src/blockchain/blockchain");

// [[ Função para verificar a validade da transação ]]
function verifyTransaction(tx) {
  try {
    // [[ Verifica se o objeto contém todas as propriedades e tipos esperados ]]
    if (
      tx !== null &&
      typeof tx === "object" &&
      typeof tx.fromAddress === "string" &&
      typeof tx.toAddress === "string" &&
      typeof tx.amount === "number" &&
      typeof tx.timestamp === "number" &&
      typeof tx.signature === "string"
    ) {
      const transaction = new Transaction(
        tx.fromAddress,
        tx.toAddress,
        tx.amount
      );
      transaction.timestamp = tx.timestamp;
      transaction.signature = tx.signature;

      // [[ Verifica se a transação é válida com base na assinatura ]]
      return transaction.isValid();
    }
    return false;
  } catch (error) {
    console.error("Error in transaction verification:", error.message);
    return false;
  }
}

// [[ Criação do servidor HTTP ]]
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  switch (parsedUrl.pathname) {
    case "/transaction":
      if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString(); // [[ Concatena os dados recebidos ]]
        });

        req.on("end", () => {
          try {
            const transaction = JSON.parse(body);

            // [[ Verifica a transação e adiciona à cadeia se for válida ]]
            if (verifyTransaction(transaction)) {
              const tx = new Transaction(
                transaction.fromAddress,
                transaction.toAddress,
                transaction.amount
              );
              tx.timestamp = transaction.timestamp;
              tx.signature = transaction.signature;

              chain.addTransaction(tx);

              // [[ Responde com sucesso se a transação for válida ]]
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  status: "The transaction was completed successfully!",
                })
              );
            } else {
              // [[ Responde com erro se a transação for inválida ]]
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  status: "Invalid transaction data or signature.",
                })
              );
            }
          } catch (error) {
            // [[ Responde com erro se houver problema ao analisar o objeto da transação ]]
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                status: "Error parsing transaction object: " + error.message,
              })
            );
          }
        });
      } else {
        // [[ Responde com erro se o método HTTP não for POST ]]
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "Method Not Allowed" }));
      }
      break;

    default:
      // [[ Responde com a cadeia de blocos para todos os outros caminhos ]]
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(chain));
      break;
  }
});

// [[ Inicia o servidor na porta especificada no arquivo .env ou na porta padrão 8080 ]]
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
