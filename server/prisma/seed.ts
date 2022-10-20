import { PrismaClient } from '@prisma/client';
import { categoria } from './seeds/categoria';

const prisma = new PrismaClient();

async function main() {
    //Generos
    await prisma.categoria.createMany({
      data: categoria
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