//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const detallePagoController = require("../controllers/detallePagoController");

//Definición de rutas para generos
router.get("/", detallePagoController.get);

router.get("/:id", detallePagoController.create);

module.exports = router;