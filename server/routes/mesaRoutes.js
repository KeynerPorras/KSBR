const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const mesaController=require("../controllers/mesaController");
//Rutas de videojuegos

router.get("/",mesaController.get);



module.exports=router;