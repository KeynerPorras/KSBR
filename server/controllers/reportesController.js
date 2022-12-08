const { PrismaClient, Prisma } = require("@prisma/client");
const { parse } = require("path");
const prisma = new PrismaClient();

module.exports.getVentaFecha = async (request, response, next) => {
    let values = request.body,
    fechaI = new Date(values.fechaI), 
    fechaF = new Date(values.fechaF),
    result = null;

    let date = new Date();

    result = await prisma.$queryRaw(
    Prisma.sql`SELECT r.nombre AS Restaurante, SUM(c.totalPagar) AS Ventas FROM restaurante r, comanda c
    WHERE c.idRestaurante = r.id AND c.estado = 'pagada' 
    AND c.fechaComanda BETWEEN '2022-10-27' AND '2022-12-12'
    GROUP BY r.id`
  )
  //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
  response.json(result);
};

module.exports.getVentaFecha2 = async (request, response, next) => {
  let values = request.body,
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF),
  result = null;

  let date = new Date();

  result = await prisma.$queryRaw(
  Prisma.sql`SELECT r.nombre AS Restaurante, SUM(c.totalPagar) AS Ventas FROM restaurante r, comanda c
  WHERE c.idRestaurante = r.id AND c.estado = 'pagada' 
  AND c.fechaComanda BETWEEN ${fechaI} AND ${fechaF}
  GROUP BY r.id`
)
//SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
response.json(result);
};
//====================================================================================
//====================================================================================
module.exports.getVentaPago = async (request, response, next) => {
  let values = request.body,
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF),
  result = null;

  let date = new Date();

  result = await prisma.$queryRaw(
  Prisma.sql`SELECT t.nombre AS Pago ,SUM(c.totalPagar) AS Ventas 
  FROM tipopago t, detallepago d, comanda c, restaurante r 
  WHERE c.idRestaurante = r.id AND d.idComanda = c.id 
  AND d.idTipo = t.id AND c.estado = 'pagada' AND 
  c.fechaComanda BETWEEN '2022-10-27' AND '2022-12-12' AND
  t.id = 1 GROUP BY t.id`
)
//SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
response.json(result);
};

module.exports.getVentaPago2 = async (request, response, next) => {
  let values = request.body,
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF),
  rol = parseInt(values.rol);
  result = null;

  let date = new Date();

  result = await prisma.$queryRaw(
  Prisma.sql`SELECT t.nombre AS Pago ,SUM(c.totalPagar) AS Ventas 
  FROM tipopago t, detallepago d, comanda c, restaurante r 
  WHERE c.idRestaurante = r.id AND d.idComanda = c.id 
  AND d.idTipo = t.id AND c.estado = 'pagada' AND 
  c.fechaComanda BETWEEN ${fechaI} AND ${fechaF} AND
  t.id = ${rol} GROUP BY t.id`
)
//SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
response.json(result);
};

//====================================================================================
//====================================================================================
module.exports.getVentaMesa = async (request, response, next) => {
  let values = request.body,
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF),
  result = null;

  let date = new Date();

  result = await prisma.$queryRaw(
  Prisma.sql`SELECT m.codigo AS filtro, SUM(c.totalPagar) AS venta FROM mesa m, comanda c
  WHERE c.idMesa = m.id AND c.estado = 'pagada' AND 
  c.fechaComanda BETWEEN '2022-10-27' AND '2022-12-12'
  GROUP BY m.id`
)
//SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
response.json(result);
};

module.exports.getVentaMesaFech = async (request, response, next) => {
  let values = request.body,
  fechaI = new Date(values.fechaI), 
  fechaF = new Date(values.fechaF),
  rol = values.rol;
  result = null;

  let date = new Date();

  if(rol == 'mesa'){
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT m.codigo AS filtro, SUM(c.totalPagar) AS venta FROM mesa m, comanda c
      WHERE c.idMesa = m.id AND c.estado = 'pagada' AND 
      c.fechaComanda BETWEEN ${fechaI} AND ${fechaF}
      GROUP BY m.id`
    )
  }else{
    result = await prisma.$queryRaw(
      Prisma.sql`SELECT u.nombre AS filtro, SUM(c.totalPagar) AS venta FROM usuario u, comanda c
      WHERE c.idUsuario = u.id AND c.estado = 'pagada' AND 
      c.fechaComanda BETWEEN ${fechaI} AND ${fechaF}
      GROUP BY u.nombre`
    )
  }
//SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
response.json(result);
};