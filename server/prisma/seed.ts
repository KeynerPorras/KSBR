import { PrismaClient } from '@prisma/client';
import { categoria } from './seeds/categoria';
import { restaurante } from './seeds/restaurante';
import { mesa } from './seeds/mesa';
import { producto } from './seeds/producto';
import { usuario } from './seeds/usuario';

const prisma = new PrismaClient();

async function main() {
    //Categoria
    await prisma.categoria.createMany({
      data: categoria
    });
    //Restaurante
    await prisma.restaurante.createMany({
      data: restaurante
    });
    await prisma.mesa.createMany({
      data: mesa
    });
    await prisma.producto.createMany({
      data: producto
    });
    await prisma.usuario.createMany({
      data: usuario
    });

    await prisma.producto.create({
      data: {
        nombre:"Hamburguesa begana",
        descripcion: "Hamgurguesa sin carne",
        precio: 500,
        estado:true,
        idCategoria:2,
      }
    });
  

  }
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });