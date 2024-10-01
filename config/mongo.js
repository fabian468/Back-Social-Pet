const mongoose = require("mongoose");


const dbConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Conectado a la base de datos"))
        .catch((err) => console.log("no se pudo conectar ", err));
}

module.exports = { dbConnect }