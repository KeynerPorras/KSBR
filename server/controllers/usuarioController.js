const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    
  });
  response.json(usuario);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const videojuego = await prisma.usuario.findUnique({
    where: { id: id }
  });
  response.json(videojuego);
};

module.exports.create=async(request, response, next)=>{
  let producto= request.body;
  const newproducto= await prisma.usuario.create({
    data:{
      nombre:producto.nombre,
      descripcion:producto.descripcion,
      precio:producto.precio,
      estado:producto.estado,
      idCategoria:producto.idCategoria,
      restaurantes:{
        connect: producto.restaurantes
      },
    }
  });
  response.json(newproducto);
};