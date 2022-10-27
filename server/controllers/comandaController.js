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
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const mesa = await prisma.comanda.findUnique({
      where: {
        id: id,
      },
      include:{
        mesa:true,
        usuario:true,
        lineaComandas:{
            select:{
                notas:true,
                cantidad:true,
                producto:true
            }
        }
      }
    });
    response.json(mesa);
  };
