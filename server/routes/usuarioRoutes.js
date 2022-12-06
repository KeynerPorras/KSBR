const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const usuarioController=require("../controllers/usuarioController");
//Rutas de videojuegos

router.get("/",usuarioController.get);

router.get("/estados/",usuarioController.getEstados);

router.post("/",usuarioController.create);

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

router.get("/:id",usuarioController.getById);

router.get("/existe/:id",usuarioController.getExiste);

router.put("/:id",usuarioController.update);

module.exports=router;