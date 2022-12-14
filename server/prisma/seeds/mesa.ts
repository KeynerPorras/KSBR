import {EstadoComanda} from "@prisma/client";
import {EstadosMesas} from "@prisma/client";




export const mesa = [
  //1
  {
    codigo:"KSOC-1",
    idRestaurante: 1,
    capacidad: 4,
    estado:EstadosMesas.libre
  },
  {
    codigo:"KSOC-2",
    idRestaurante: 1,
    capacidad: 6,
    estado:EstadosMesas.porPagar
  },
  {
    codigo:"KSOC-3",
    idRestaurante: 1,
    capacidad: 2,
    estado:EstadosMesas.libre
  },
  {
    codigo:"KSOC-4",
    idRestaurante: 1,
    capacidad: 5,
    estado:EstadosMesas.libre
  },
  {
    codigo:"KSSR-5",
    idRestaurante: 2,
    capacidad: 4,
    estado:EstadosMesas.libre
  },
  {
    codigo:"KSSC-6",
    idRestaurante: 3,
    capacidad: 5,
    estado:EstadosMesas.libre
  },
  {
    codigo:"KSSC-7",
    idRestaurante: 3,
    capacidad: 6,
    estado:EstadosMesas.libre
  },
];
