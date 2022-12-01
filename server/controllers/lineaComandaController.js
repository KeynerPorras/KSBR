const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const mesa = await prisma.lineaComanda.findMany({
      where: {
        idComanda: id,
      },
      include:{
        producto:true
      }
    });
    response.json(mesa);
  };


  module.exports.create = async (request, response, next) => {
    let comanda = request.body; 
    console.log(comanda) ;
    const newcomanda = await prisma.lineaComanda.create({
      data: {
        idComanda: comanda.idComanda,
        idProducto: comanda.idProducto,
        cantidad: comanda.cantidad,
       notas:comanda.notas               
      },
    });
    response.json(newcomanda);
  };