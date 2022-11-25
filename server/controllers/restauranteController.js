const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesa = await prisma.restaurante.findMany({
    
  });
  response.json(mesa);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.restaurante.findUnique({

    where:{
      id:id
    },include:{
      productos:{
        include:{
          categoria:true
        }
      }
    }
  });
  response.json(mesa);
};


