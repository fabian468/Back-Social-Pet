const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/useRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const path = require('path');



require("dotenv").config();

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log("no se pudo conectar ", err));

// Configuraciones
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use("/api", userRoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Puerto abierto en: " + PORT);
});
