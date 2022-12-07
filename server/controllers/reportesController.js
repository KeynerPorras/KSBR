const { PrismaClient, Prisma } = require("@prisma/client");
const { describe } = require("node:test");

const prisma = new PrismaClient();

module.exports.reporteXFechas = async (request, response, next) => {
    let result = null;
  
    let date = new Date();
    /* result = await prisma.$queryRaw(
      Prisma.sqlSELECT s.nombre as sede, SUM(c.total) as total FROM sede s INNER JOIN mesa m ON m.idSede=s.id INNER JOIN comanda c ON c.idMesa=m.id WHERE c.estado='entregada'AND YEAR(c.fecha)= ${date.getFullYear()} AND MONTH(c.fecha)= ${date.getMonth() + 1} AND DAY(c.fecha)= ${date.getDate() + 1} GROUP BY s.id */

      result = await prisma.$queryRaw(
        Prisma.sql `SELECT COUNT(comanda.id) AS ventas FROM comanda 
        WHERE comanda.estado = 'pagada' 
        AND comanda.fechaComanda BETWEEN YEAR(c.fecha)= ${date.getFullYear()} AND MONTH(c.fecha)= ${date.getMonth() + 1} AND DAY(c.fecha)= ${date.getDate() + 1} `

    )
    response.json(result);
    }