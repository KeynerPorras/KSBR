import { PrismaClient } from "@prisma/client";
import { categoria } from "./seeds/categoria";
import { restaurante } from "./seeds/restaurante";
import { mesa } from "./seeds/mesa";
import { ingrediente } from "./seeds/ingrediente";
import { usuario } from "./seeds/usuario";
import { tipoPago } from "./seeds/tipoPago";
import { lineaComanda } from "./seeds/lineaComanda";
import { EstadoComanda } from "@prisma/client";
import { detallePago } from "./seeds/detallePago";
const prisma = new PrismaClient();

async function main() {
  //Categoria
  await prisma.categoria.createMany({
    data: categoria,
  });
  //Restaurante
  await prisma.restaurante.createMany({
    data: restaurante,
  });
  await prisma.mesa.createMany({
    data: mesa,
  });
  
  await prisma.usuario.createMany({
    data: usuario,
  });
  await prisma.tipoPago.createMany({
    data: tipoPago,
  });

  await prisma.producto.create({
    data: {
      nombre: "Vino Blanco",
      descripcion: "Vino del año 1996",
      precio: 78000,
      estado: true,
      idCategoria: 1,
      restaurantes: {
        connect: [{ id: 1 }],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Hamburguesa doble",
      descripcion: "Hamgurguesa dobre torta de carne",
      precio: 4500,
      estado: true,
      idCategoria: 2,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Fajitas de pollo",
      descripcion: "Fajitas de pollo",
      precio: 3500,
      estado: true,
      idCategoria: 3,
      restaurantes: {
        connect: [{ id: 1 },{ id: 3 }],
      },
    },
  });

  await prisma.producto.create({
    data: {
      nombre: "Hamburguesa vegana",
      descripcion: "Hamgurguesa sin carne",
      precio: 3500,
      estado: true,
      idCategoria: 2,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.comanda.create({
    data: {
      idMesa: 1,
      idUsuario: "208060669",
      estado: EstadoComanda.pagada,
      direccion: "restaurante",
      subTotal: 81000,
      impuesto: 4000,
      totalPagar: 85000,
      fechaComanda: new Date('2022-10-27'),
    },
  });
  await prisma.comanda.create({
    data: {
      idMesa: 2,
      idUsuario: "208060668",
      estado: EstadoComanda.pendiente,
      direccion: "restaurante",
      subTotal: 7000,
      impuesto: 1000,
      totalPagar: 8000,
      fechaComanda: new Date('2022-10-27'),
    },
  });
  await prisma.comanda.create({
    data: {
      idMesa: 3,
      idUsuario: "208060667",
      estado: EstadoComanda.porPagar,
      direccion: "restaurante",
      subTotal: 9500,
      impuesto: 2000,
      totalPagar: 11500,
      fechaComanda: new Date('2022-10-27'),
    },
  });

  await prisma.lineaComanda.createMany({
    data: lineaComanda,
  });
  await prisma.ingrediente.createMany({
    data: ingrediente,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
