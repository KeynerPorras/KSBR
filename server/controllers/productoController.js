const {
  PrismaClient
} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    include: {
      categoria: true,
      restaurantes: true,
      
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
      
    },
  });
  response.json(productos);
};



//Crear una Producto
module.exports.create=async(request, response, next)=>{
  let producto= request.body;
  const newproducto= await prisma.producto.create({
    data:{
      nombre:producto.nombre,
      descripcion:producto.descripcion,
      precio:producto.precio,
      estado:producto.estado,
      ingredientes:producto.ingredientes,
      idCategoria:producto.idCategoria,
      restaurantes:{
        connect: producto.restaurantes
      },
    }
  });
  response.json(newproducto);
};

module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idproducto = parseInt(request.params.id);
  //Obtener producto vieja
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idproducto },
    include: {
      restaurantes: {
        select:{
          id:true
        }
      }
    }
  });

  const newproducto = await prisma.producto.update({
    where: {
      id: idproducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      idCategoria: producto.idCategoria,
      estado: producto.estado,
      ingredientes:producto.ingredientes,
      restaurantes:{
        disconnect: productoViejo.restaurantes,
        connect: producto.restaurantes
      }
    },
  });
  response.json(newproducto);
};
