//Crear una ingred
module.exports.create = async (request, response, next) => {
    let ingred = request.body;  
    const newingred = await prisma.ingred.create({
      data: {
        idProducto: ingred.idProducto,
        nombre: ingred.nombre,
        estado: true    
      },
    });
    response.json(newingred);
  };