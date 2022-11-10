const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();
//---Archivos de rutas
const productoRouter = require("./routes/productoRoutes");
const mesaRouter = require("./routes/mesaRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const comandaRouter = require("./routes/comandaRoutes");
const restauranteRouter = require("./routes/restauranteRoutes");
const categoriaRouter = require("./routes/categoriaRoutes");
const ingredienteRouter = require("./routes/ingredienteRoutes");

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
})
);
//---- Definir rutas ----
app.use("/producto/",productoRouter);
app.use("/mesa/",mesaRouter);
app.use("/usuario/",usuarioRouter);
app.use("/comanda/",comandaRouter);
app.use("/restaurante/",restauranteRouter);
app.use("/categoria/", categoriaRouter);
app.use("/ingrediente/", ingredienteRouter);

// Servidor
app.listen(port, () => {
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});