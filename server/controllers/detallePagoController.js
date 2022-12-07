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
        idTipo: parseInt(pago.idTipo),
        monto: pago.monto,
        idComanda: pago.idComanda,    
      },
    });

    const newcomanda = await prisma.comanda.findUnique({
      where: {
        id:pago.idComanda
      }
    });

    const comanda = await prisma.comanda.update({
      where: {
        id:pago.idComanda
      },
      data: {        
        estado:"pagada"   
      },
    });

    if(newcomanda.idMesa!=null){
      const newmesa = await prisma.mesa.update({
        where: {
          id:newcomanda.idMesa
        },
        data: {
          estado:"libre"   
        },
      });
    }

    

    response.json(newpago);
  };

  module.exports.createCliente = async (request, response, next) => {
    let pago = request.body;  
    const newpago = await prisma.detallePago.create({
      data: {
        idTipo: 1,
        monto: pago.totalPagar,
        idComanda: pago.id,    
      },
    });
   

    response.json(newpago);
  };