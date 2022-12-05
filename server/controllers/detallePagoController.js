const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const categorias = await prisma.detallePago.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(categorias);
};

module.exports.create = async (request, response, next) => {
    let pago = request.body;  
    const newpago = await prisma.detallePago.create({
      data: {
        idTipo: pago.idTipo,
        monto: pago.monto,
        idComanda: pago.idComanda,    
      },
    });
    response.json(newpago);
  };