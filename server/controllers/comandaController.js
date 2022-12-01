const { PrismaClient } = require("@prisma/client");
const { describe } = require("node:test");

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


  module.exports.getByIdMesa = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const mesa = await prisma.comanda.findFirst({
      where: {
        idMesa: id,
      },
      orderBy: {
        id: 'desc',
      },take:1,

      include:{       
        lineaComandas:{
            select:{
                notas:true,
                cantidad:true,
                producto:true
            }
        }
      }
    });

    /* const lineaComanda = await prisma.lineaComanda.findMany({
      where: {
        idComanda: mesa.id,
      },
      include:{
        producto:true
      }
    }); */



    response.json(mesa);
  };

  

  module.exports.getNumComanda = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const mesa = await prisma.comanda.findUnique({
      where: {
        idMesa: id,
      },
      orderBy: {
        id: 'desc',
      },take:1,

      include:{       
        lineaComandas:{
            select:{
                notas:true,
                cantidad:true,
                producto:true
            }
        }
      }
    });
    response.json(mesa.id);
  };

  //Crear una comanda
module.exports.create = async (request, response, next) => {
  let comanda = request.body;  
  const newcomanda = await prisma.comanda.create({
    data: {
      idMesa: comanda.idMesa,
      idUsuario: comanda.idUsuario,
      idRestaurante: comanda.idRestaurante,
      estado: comanda.estado,
      direccion: comanda.direccion,
      subTotal: comanda.subTotal,
      impuesto: comanda.impuesto,
      totalPagar: comanda.totalPagar,
      fechaComanda: comanda.fechaComanda           
    },
  });
  response.json(newcomanda);
};
