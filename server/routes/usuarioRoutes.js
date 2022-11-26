const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const usuarioController=require("../controllers/usuarioController");
//Rutas de videojuegos

router.get("/",usuarioController.get);

router.get("/estados/",usuarioController.getEstados);

router.post("/",usuarioController.create);

router.get("/:id",usuarioController.getById);

router.put("/:id",usuarioController.update);

module.exports=router;