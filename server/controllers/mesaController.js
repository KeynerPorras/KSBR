const { PrismaClient, EstadosMesas } = require("@prisma/client");
const { count } = require("console");
const { query } = require("express");
const { type } = require("os");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesa = await prisma.mesa.findMany({
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};

module.exports.getEstados = async (request, response) => {
  
  const estados = [{"id":EstadosMesas.libre},{"id":EstadosMesas.ocupada},{"id":EstadosMesas.ordenRealizada},
  {"id":EstadosMesas.porPagar},{"id":EstadosMesas.reservada}]
 // const estados = EstadosMesas;
  response.json(estados);
};

module.exports.getNextId = async (request, response, next) => {
  let id = parseInt(request.params.id);
  
  var codigo;
  var numero;
  var letras;
  if(id==2){
    letras="KSSR" +"-" ;
  }
  if(id==1){
    letras="KSOC" +"-" ;
  }
  if(id==3){
    letras="KSSC" +"-" ;
  }


  const restaurante = await prisma.restaurante.findUnique({
    where: {
      id: id,
    },
  });

  const mesa = await prisma.mesa.count({
    where: {
      //idRestaurante: id,
    },
  });
  const mesaExiste = await prisma.mesa.findUnique({
    where: {
      id: mesa+1,
    },
  });
  console.log(mesaExiste);
  
  if(mesaExiste==null){
    codigo=letras+ parseInt(mesa+1) ;
  }
  if(mesaExiste!=null){
    
    codigo=letras+ parseInt(mesa+1) ;
  }
  response.json(codigo);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: id,
    },
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};
module.exports.getByIdRestaurante = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findMany({
    where: {
      idRestaurante: id,
    },
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};

//Crear una mesa
module.exports.create = async (request, response, next) => {
  let mesa = request.body;  
  const newmesa = await prisma.mesa.create({
    data: {
      codigo: mesa.codigo,
      idRestaurante: mesa.idRestaurante,
      capacidad: mesa.capacidad,
      estado: mesa.estado,      
    },
  });
  response.json(newmesa);
};

module.exports.update = async (request, response, next) => {
  let mesa = request.body;
  let idmesa = parseInt(request.params.id);
  //Obtener mesa vieja
  const mesaViejo = await prisma.mesa.findUnique({
    where: { id: idmesa },
    include: {
      restaurante: {
        select:{
          id:true
        }
      }
    }
  });

  const newmesa = await prisma.mesa.update({
    where: {
      id: idmesa,
    },
    data: {
      codigo: mesa.codigo,
      idRestaurante: mesa.idRestaurante,
      capacidad: mesa.capacidad,
      estado: mesa.estado,
      
    },
  });
  response.json(newmesa);
};

