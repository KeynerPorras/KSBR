const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const lineaComandaController=require("../controllers/lineaComandaController");
//Rutas de videojuegos

router.get("/:id",lineaComandaController.getById);

router.post("/eliminar/",lineaComandaController.delete);

router.post("/",lineaComandaController.create);

router.put("/:id,idProducto",lineaComandaController.update);


module.exports=router;