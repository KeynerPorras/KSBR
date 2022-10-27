import {EstadoComanda} from "@prisma/client";


export const mesa = [
  //1
  {
    idRestaurante: 1,
    capacidad: 4,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 1,
    capacidad: 6,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 1,
    capacidad: 2,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 1,
    capacidad: 5,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 2,
    capacidad: 4,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 3,
    capacidad: 5,
    estado:EstadoComanda.pendiente
  },
  {
    idRestaurante: 3,
    capacidad: 6,
    estado:EstadoComanda.pendiente
  },
];
