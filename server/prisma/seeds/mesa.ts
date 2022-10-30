import {EstadoComanda} from "@prisma/client";
import {EstadosMesas} from "@prisma/client";

export const mesa = [
  //1
  {
    idRestaurante: 1,
    capacidad: 4,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 1,
    capacidad: 6,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 1,
    capacidad: 2,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 1,
    capacidad: 5,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 2,
    capacidad: 4,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 3,
    capacidad: 5,
    estado:EstadosMesas.reservada
  },
  {
    idRestaurante: 3,
    capacidad: 6,
    estado:EstadosMesas.reservada
  },
];
