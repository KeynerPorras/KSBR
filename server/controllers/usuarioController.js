const { PrismaClient, Rol } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    include:{
      restaurante:true,
    }
  });
  response.json(usuario);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  const videojuego = await prisma.usuario.findUnique({
    where: { id: id },
    include:{
      restaurante:true
    }
  });
  response.json(videojuego);
};


module.exports.create=async(request, response, next)=>{
  let usuario= request.body;
  const newproducto= await prisma.usuario.create({
    data:{
      id:usuario.id,
      correo:usuario.correo,
      password:usuario.password,
      rol:usuario.rol,
      nombre:usuario.nombre,
      apellido1:usuario.apellido1,
      apellido2:usuario.apellido2,
      idRestaurante:usuario.idRestaurante
    }
  });
  response.json(newproducto);
};

module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idusuario = request.params.id;
  //Obtener producto vieja
  const usuarioViejo = await prisma.usuario.findUnique({
    where: { id: idusuario }
  });

  const newproducto = await prisma.usuario.update({
    where: {
      id: idusuario,
    },
    data: {
      id:usuario.id,
      correo:usuario.correo,
      password:usuario.password,
      rol:usuario.rol,
      nombre:usuario.nombre,
      apellido1:usuario.apellido1,
      apellido2:usuario.apellido2,
      idRestaurante:usuario.idRestaurante
    },
  });
  response.json(newproducto);
};

module.exports.getEstados = async (request, response) => {
  
  const estados = [{"id":Rol.administrador},{"id":Rol.cliente},{"id":Rol.mesero}]
 // const estados = EstadosMesas;
  response.json(estados);
};
