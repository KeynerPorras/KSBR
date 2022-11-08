const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const mesaController=require("../controllers/mesaController");
//Rutas de mesas

router.get("/",mesaController.get);

router.get("/estados/",mesaController.getEstados);

router.post("/",mesaController.create);

router.get("/:id",mesaController.getById);

router.put("/:id",mesaController.update);

router.get("/rest/:id",mesaController.getByIdRestaurante);

module.exports=router;