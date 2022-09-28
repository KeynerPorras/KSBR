/*
  Warnings:

  - The values [ADMINISTRADOR,CLIENTE,MESERO] on the enum `Usuario_rol` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `TipoPago` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Estado` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comanda` ADD COLUMN `TipoPago` ENUM('tarjeta', 'efectivo', 'ambas') NOT NULL,
    ADD COLUMN `estado` ENUM('registrada', 'pendiente', 'enProceso', 'entregada', 'porPagar') NOT NULL;

-- AlterTable
ALTER TABLE `ingrediente` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `mesa` ADD COLUMN `Estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `producto` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `rol` ENUM('administrador', 'cliente', 'mesero') NOT NULL;
