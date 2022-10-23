const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const usuarioController=require("../controllers/usuarioController");
//Rutas de videojuegos

router.get("/",usuarioController.get);



module.exports=router;