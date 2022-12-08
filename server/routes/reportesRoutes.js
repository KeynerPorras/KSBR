const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const reportesController=require("../controllers/reportesController");

//Rutas de videojuegos

router.get("/vFecha/:fechaI, fechaF",reportesController.getVentaFecha);



module.exports=router;