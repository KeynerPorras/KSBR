import {Rol} from "@prisma/client";
export const usuario = [
    //1
    {
      id: "208060669",
      correo: "kporrascruz@gmail.com",
      password: "08072",
      rol: Rol.cliente,
      nombre: "keyner",
      apellido1: "Porras",
      apellido2:"Cruz",
      idRestaurante:1
    },
    {
      id: "208060668",
      correo: "kporras@gmail.com",
      password: "08072",
      rol: Rol.mesero,
      nombre: "Kevin",
      apellido1: "Morales",
      apellido2:"Flores",
      idRestaurante:2
    },
    {
      id: "208060667",
      correo: "kpcruz@gmail.com",
      password: "08072",
      rol: Rol.administrador,
      nombre: "Gary",
      apellido1: "Barahona",
      apellido2:"Varela",
      idRestaurante:3
    },
  ];