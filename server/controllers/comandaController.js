const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const comanda = await prisma.comanda.findMany({
    include:{
        usuario:true,
        lineaComandas:true,
        mesa:true,
        detallePago:true
    }
  });
  response.json(comanda);
};

