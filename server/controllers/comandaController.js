const { PrismaClient, Prisma } = require("@prisma/client");
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
        },
        usuario:true
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

  const newMesa = await prisma.mesa.update({
    where:{
      id:comanda.idMesa
    },
    data: {
      estado: "ocupada"       
    },
  });

  response.json(newcomanda);
};

module.exports.update = async (request, response, next) => {
  let detalle = request.body;
  console.log(detalle.subTotal)
  console.log(detalle.impuesto)
  console.log(detalle.total)
  console.log(detalle)
  let idComanda = parseInt(request.params.id);
  //Obtener mesa vieja
  const comanda = await prisma.comanda.findUnique({
    where: { id:idComanda},
    
  });

  const newmesa = await prisma.mesa.update({
    where: {
      id:comanda.idMesa
    },
    data: {
      estado:"porPagar"   
    },
  });

  const newcomanda = await prisma.comanda.update({
    where: {
      id:idComanda
    },
    data: {
      subTotal: detalle.subTotal,
      impuesto: detalle.impuesto,
      totalPagar: detalle.totalPagar,
      estado:"registrada"   
    },
  });
  response.json(newcomanda);
};

module.exports.createCliente = async (request, response, next) => {
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
      fechaComanda: comanda.fechaComanda,
      lineaComandas:{
        createMany:{
          data:comanda.lineaComandas
        },        
      },           
    },
  });


  

  response.json(newcomanda);
};

/* module.exports.getReporteFechas = async (request, response, next) => {
  let anno1 = request.params.anno1;
  let mes1 = request.params.mes1;
  let dia1 = request.params.dia1;

  let anno2 = request.params.anno2;
  let mes2 = request.params.mes2;
  let dia2 = request.params.dia2;
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(comanda.id)  AS ventas FROM comanda WHERE comanda.estado = 'pagada' AND comanda.fechaComanda BETWEEN '${anno1}-${mes1}-${dia1}' AND '${anno2}-${mes2}-${dia2}'`
  )
  //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
  response.json(result);
}; */


module.exports.getReporteFechaHoy = async (request, response, next) => {
  let fecha = Date.now(); 
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT COUNT(comanda.id) AS cantidad, SUM(comanda.totalPagar) AS ventas FROM comanda WHERE comanda.estado = 'pagada' AND comanda.fechaComanda = '2022-10-27'`
  )
  //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
  response.json(result);
};
