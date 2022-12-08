const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const reportesController=require("../controllers/reportesController");

//Rutas de videojuegos

router.get("/vFecha",reportesController.getVentaFecha);

router.post("/vFecha2",reportesController.getVentaFecha2);



module.exports=router;