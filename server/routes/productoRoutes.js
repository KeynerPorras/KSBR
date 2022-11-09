const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const productoController=require("../controllers/productoController");
//Rutas de videojuegos

router.get("/",productoController.get);

router.post("/",productoController.create);

router.get("/:id",productoController.getById);

module.exports=router;