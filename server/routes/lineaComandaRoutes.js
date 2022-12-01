const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const lineaComandaController=require("../controllers/lineaComandaController");
//Rutas de videojuegos

router.get("/:id",lineaComandaController.getById);

router.post("/",lineaComandaController.create);


module.exports=router;