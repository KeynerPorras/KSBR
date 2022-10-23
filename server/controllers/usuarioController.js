const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    
  });
  response.json(usuario);
};