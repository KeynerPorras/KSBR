const {
  PrismaClient
} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    include: {
      categoria: true,
      restaurantes: true,
      ingredientes:true
    },
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(productos);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const productos = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      categoria: true,
      restaurantes: true,
      ingredientes:true
    },
  });
  response.json(productos);
};