const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getVentaFecha = async (request, response, next) => {
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF);

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT r.nombre AS Restaurante, SUM(c.totalPagar)  AS Ventas FROM comanda c, restaurante r
    WHERE c.idRestaurante = r.id AND c.estado = 'pagada' 
    AND c.fechaComanda BETWEEN '2022-10-27' AND '2022-10-27' GROUP BY r.id`
  )
  //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
  response.json(result);
};