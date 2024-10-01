const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

const userRoutes = require("./app/routes/useRoutes");
const postRoutes = require("./app/routes/postRoutes");
const friendsRoutes = require("./app/routes/friendsRoutes");
const helpRoutes = require('./app/routes/helpRoutes');

const { dbConnect } = require('./config/mongo')



require("dotenv").config();

// Conexión a la base de datos
dbConnect()

// Configuraciones
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use("/api", userRoutes);
app.use("/api", friendsRoutes);
app.use("/post", postRoutes);
app.use('/api', helpRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Puerto abierto en: " + PORT);
});
