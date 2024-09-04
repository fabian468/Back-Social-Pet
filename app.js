const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/useRoutes");
const cors = require("cors");

require("dotenv").config();

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log("no se pudo conectar ", err));

// Configuraciones
app.use(express.json());
app.use(cors());
// Rutas
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Puerto abierto en: " + PORT);
});
