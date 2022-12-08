import {Rol} from "@prisma/client";
export const usuario = [
    //1
    {
      id: "208060669",
      correo: "kporrascruz@gmail.com",
      password: "$2b$10$m/qsdU.MGiG1wqpmFpTjc.JGDqmfiCG8OSj4l1ibgt9I6Cy50QnXi",
      rol: Rol.cliente,
      nombre: "keyner",
      apellido1: "Porras",
      apellido2:"Cruz",
      idRestaurante:1
    },
    {
      id: "208060668",
      correo: "kporras@gmail.com",
      password: "$2b$10$m/qsdU.MGiG1wqpmFpTjc.JGDqmfiCG8OSj4l1ibgt9I6Cy50QnXi",
      rol: Rol.mesero,
      nombre: "Kevin",
      apellido1: "Morales",
      apellido2:"Flores",
      idRestaurante:2
    },
    {
      id: "208060123",
      correo: "emanuel@gmail.com",
      password: "$2b$10$m/qsdU.MGiG1wqpmFpTjc.JGDqmfiCG8OSj4l1ibgt9I6Cy50QnXi",
      rol: Rol.mesero,
      nombre: "Emanuel",
      apellido1: "Porras",
      apellido2:"Cruz",
      idRestaurante:2
    },
    {
      id: "208060999",
      correo: "juan@gmail.com",
      password: "$2b$10$m/qsdU.MGiG1wqpmFpTjc.JGDqmfiCG8OSj4l1ibgt9I6Cy50QnXi",
      rol: Rol.mesero,
      nombre: "Juan",
      apellido1: "Perez",
      apellido2:"Castro",
      idRestaurante:1
    },
    {
      id: "208060667",
      correo: "kpcruz@gmail.com",
      password: "$2b$10$m/qsdU.MGiG1wqpmFpTjc.JGDqmfiCG8OSj4l1ibgt9I6Cy50QnXi",
      rol: Rol.administrador,
      nombre: "Gary",
      apellido1: "Barahona",
      apellido2:"Varela",
      idRestaurante:3
    },
  ];