const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const reportesController=require("../controllers/reportesController");

//Rutas de videojuegos

router.get("/vFecha",reportesController.getVentaFecha);

router.get("/vPago",reportesController.getVentaPago);

router.get("/vMesa",reportesController.getVentaMesa);



router.post("/vFecha2",reportesController.getVentaFecha2);

router.post("/vPago2",reportesController.getVentaPago2);

router.post("/vMesa2",reportesController.getVentaMesaFech);




module.exports=router;