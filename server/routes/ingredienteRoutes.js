const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const ingredController=require("../controllers/ingredienteController");
//Rutas de ingreds

router.post("/",ingredController.create);


module.exports=router;