const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesa = await prisma.restaurante.findMany({
    
  });
  response.json(mesa);
};

