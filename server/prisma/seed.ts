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
      precio: 28000,
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
  await prisma.producto.create({
    data: {
      nombre: "SANTA FE BURGER",
      descripcion: "7 niveles de deliciosos ingredientes",
      precio: 8500,
      estado: true,
      idCategoria: 2,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Batido melocotón",
      descripcion: "El sabrosísimo melocotón está en el mercado desde principios del verano hasta bien entrado el otoño. ",
      precio: 3000,
      estado: true,
      idCategoria: 4,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Batido kiwi",
      descripcion: "Nos gusta destacar su color verde intenso en recetas que combinen ingredientes del mismo color,",
      precio: 2000,
      estado: true,
      idCategoria: 4,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Coca Cola",
      descripcion: "Gaseosa",
      precio: 1200,
      estado: true,
      idCategoria: 4,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Fanta",
      descripcion: "Gaseosa",
      precio: 1200,
      estado: true,
      idCategoria: 4,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Imperial",
      descripcion: "Cerveza",
      precio: 1200,
      estado: true,
      idCategoria: 5,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Bavaria",
      descripcion: "Cerveza",
      precio: 1500,
      estado: true,
      idCategoria: 5,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.producto.create({
    data: {
      nombre: "Smirnoff",
      descripcion: "Cerveza",
      precio: 1700,
      estado: true,
      idCategoria: 5,
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.comanda.create({
    data: {
      idMesa: 1,
      idUsuario: "208060669",
      idRestaurante: 1,
      estado: EstadoComanda.pagada,
      direccion: "restaurante",
      subTotal: 36000,
      impuesto: 4000,
      totalPagar: 40000,
      fechaComanda: new Date('2022-10-27'),
    },
  });
  await prisma.comanda.create({
    data: {
      idMesa: 2,
      idUsuario: "208060668",
      idRestaurante: 1,
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
      idRestaurante: 1,
      estado: EstadoComanda.porPagar,
      direccion: "restaurante",
      subTotal: 9500,
      impuesto: 2000,
      totalPagar: 11500,
      fechaComanda: new Date('2022-10-27'),
    },
  });
  /* await prisma.comanda.create({
    data: {
      idMesa: 3,
      idUsuario: "208060667",
      idRestaurante: 2,
      estado: EstadoComanda.porPagar,
      direccion: "prueba",
      subTotal: 0,
      impuesto: 0,
      totalPagar: 0,
      fechaComanda: new Date('2022-10-27'),
    },
  });
  await prisma.comanda.create({
    data: {
      idMesa: 3,
      idUsuario: "208060667",
      idRestaurante: 3,
      estado: EstadoComanda.porPagar,
      direccion: "prueba",
      subTotal: 0,
      impuesto: 0,
      totalPagar: 0,
      fechaComanda: new Date('2022-10-27'),
    },
  }); */

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
