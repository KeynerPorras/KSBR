const { PrismaClient, Rol } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");
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
module.exports.getExiste = async (request, response, next) => {
  let id = request.params.id;
  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
    include:{
      restaurante:true
    }
  });
  console.log(usuario);
  if(usuario == null){
    response.json(false);
  }else{
    response.json(true);
  }
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
  let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario.password, salt);
  const newproducto= await prisma.usuario.create({
    data:{
      id:usuario.id,
      correo:usuario.correo,
      password:hash,
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
  let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(usuario.password, salt);
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
      password:hash,
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

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.Usuario.findUnique({
    where: {
      correo: userReq.correo,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = bcrypt.compare(userReq.password, user.password);
  if (checkPassword) {
    //Si el usuario es correcto: email y password
    //Crear el token
    const payload = {
      correo: user.correo,
      rol: user.rol,
    };
    //Crea el token con el payload, llave secreta
    // y el tiempo de expiración
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        user,
        token,
      },
    });
  } else {
    response.status(401).send({
      success: false,
      message: "Password incorrecto",
    });
  }
};

module.exports.register = async (request, response, next) => {
  const userData = request.body;

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt = bcrypt.genSaltSync(10);
    // Hash password
    let hash = bcrypt.hashSync(userData.password, salt);
    const user = await prisma.usuario.create({
      data: {
        id:userData.id,
        correo:userData.correo,
        password:hash,
        rol:userData.rol,
        nombre:userData.nombre,
        apellido1:userData.apellido1,
        apellido2:userData.apellido2,
        idRestaurante:userData.idRestaurante
      },
    });
    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
};

module.exports.getVentaProductoMes = async (request, response, next) => {
  let mes = parseInt(request.params.mes)|1; 
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = ${mes} GROUP BY ov.videojuegoId`
  )
  //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
  response.json(result);
};
