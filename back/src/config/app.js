const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // 🟢 Importar CORS

const empresaRoutes = require("./routes/empresa.routes");
const fornecedorRoutes = require("./routes/fornecedor.routes");

dotenv.config();
const app = express();

// 🛡️ Ativar CORS globalmente antes das rotas
app.use(cors({
  origin: "*", // ou "http://localhost:4200" se for restringir
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// 🔌 Conexão com o banco
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar com o MongoDB:", err));

// 🛣️ Rotas
app.use("/api/empresas", empresaRoutes);
app.use("/api/fornecedores", fornecedorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
