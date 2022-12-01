const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const mesa = await prisma.lineaComanda.findMany({
      where: {
        idComanda: id,
      },
      include:{
        producto:true
      }
    });
    response.json(mesa);
  };


  module.exports.create = async (request, response, next) => {
    let comanda = request.body; 
    

    const buscarProducto = await prisma.lineaComanda.findUnique({
      where:{
        idComanda_idProducto:{
          idComanda: comanda.idComanda,
          idProducto:comanda.idProducto
        }
      }
    })

    console.log(buscarProducto);

    if(buscarProducto==null){
      const newcomanda = await prisma.lineaComanda.create({
        data: {
          idComanda: comanda.idComanda,
          idProducto: comanda.idProducto,
          cantidad: comanda.cantidad,
         notas:comanda.notas               
        },
      });
      response.json(newcomanda);
    }else{
      const newlinea = await prisma.lineaComanda.update({
        where:{
          idComanda_idProducto:{
            idComanda: comanda.idComanda,
            idProducto:comanda.idProducto
          }
        },
        data: {
          cantidad: parseInt(buscarProducto.cantidad+1)       
        },
      });
      response.json(newlinea);
    }

    
  };


  module.exports.update = async (request, response, next) => {
    //let detalle = request.body;
    let idComanda = parseInt(request.params.id);
    let idProducto = parseInt(request.params.idProducto);
    //Obtener mesa vieja
    const mesaViejo = await prisma.lineaComanda.findUnique({
      where: { idComanda: idComanda,idProducto: idProducto},
      include: {
        producto: {
          select:{
            id:true
          }
        }
      }
    });
  
    const newmesa = await prisma.lineaComanda.update({
      where: {
        idComanda: idComanda,idProducto: idProducto,
      },
      data: {
        cantidad: parseInt(mesaViejo+1)       
      },
    });
    response.json(newmesa);
  };