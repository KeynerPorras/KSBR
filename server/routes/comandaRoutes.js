const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const comandaController=require("../controllers/comandaController");

//Rutas de videojuegos


router.get("/",comandaController.get);

router.post("/",comandaController.create);

router.post("/cliente",comandaController.createCliente);

router.get("/:id",comandaController.getById);

router.get("/mesa/:id",comandaController.getByIdMesa);

router.get("/numero/:id",comandaController.getNumComanda);

router.put("/:id",comandaController.update);



module.exports=router;