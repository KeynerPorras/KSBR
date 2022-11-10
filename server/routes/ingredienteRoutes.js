const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const ingredienteController=require("../controllers/ingredienteController");

router.get("/",ingredienteController.get);

router.post("/",ingredienteController.create);

module.exports=router;