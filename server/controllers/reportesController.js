const { PrismaClient, Prisma } = require("@prisma/client");
const { describe } = require("node:test");

const prisma = new PrismaClient();

module.exports.reporteXFechas = async (request, response, next) => {
    let date = new Date();

      result = await prisma.$queryRaw(
        Prisma.sql `SELECT r.nombre AS Restaurante, COUNT(c.id)  AS Ventas, SUM(c.totalPagar) AS Total
        FROM comanda c, restaurante r WHERE c.idRestaurante = r.id`

    )
    response.json(result);
    }
  