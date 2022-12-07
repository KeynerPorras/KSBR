//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const detallePagoController = require("../controllers/detallePagoController");

//Definición de rutas para generos
router.get("/", detallePagoController.get);

router.post("/", detallePagoController.create);

router.post("/cliente", detallePagoController.createCliente);

module.exports = router;