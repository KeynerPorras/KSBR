const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const restauranteController=require("../controllers/restauranteController");
//Rutas de videojuegos

router.get("/",restauranteController.get);



module.exports=router;