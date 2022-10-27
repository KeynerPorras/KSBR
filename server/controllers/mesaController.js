const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesa = await prisma.mesa.findMany({
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: id,
    },
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};
module.exports.getByIdRestaurante = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findMany({
    where: {
      idRestaurante: id,
    },
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};
