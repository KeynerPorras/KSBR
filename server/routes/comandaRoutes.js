const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const comandaController=require("../controllers/comandaController");
//Rutas de videojuegos

router.get("/",comandaController.get);


module.exports=router;