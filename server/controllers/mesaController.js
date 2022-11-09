const { PrismaClient } = require("@prisma/client");
const { count } = require("console");
const { query } = require("express");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const mesa = await prisma.mesa.findMany({
    include:{
      restaurante:true,
    }
  });
  response.json(mesa);
};

module.exports.getEstados = async (request, response, next) => {
  const estados = await prisma.EstadosMesas.findMany({
    
  });
  response.json(estados);
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
  const result = await prisma.$queryRaw`SELECT count(id) FROM mesa`  
  const newmesa = await prisma.mesa.create({
    data: {
      codigo: mesa.codigo,
      idRestaurante: mesa.idRestaurante,
      capacidad: mesa.capacidad,
      estado: mesa.estado,      
    },
  });
  console.log(result.$queryRaw);
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

