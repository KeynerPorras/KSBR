const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const ingrediente = await prisma.ingrediente.findMany({
      
    });
    response.json(ingrediente);
  };

  module.exports.create = async (request, response, next) => {
    let ingrediente = request.body;  
    const newingrediente = await prisma.ingrediente.create({
      data: {
        idProducto: ingrediente.idProducto,
        nombre: ingrediente.nombre  
      },
    });
    response.json(newingrediente);
  };