import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json());

app.post("/proxy-botflix", async (req, res) => {
  try {
    const response = await fetch(
      "https://pamellabinotto.app.n8n.cloud/webhook/botflix",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no proxy" });
  }
});

app.listen(3000, () => console.log("Proxy rodando na porta 3000"));
