/*
  Warnings:

  - Added the required column `impuesto` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPagar` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Restaurante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Restaurante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacion` to the `Restaurante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido1` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido2` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTipoUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comanda` ADD COLUMN `impuesto` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `subTotal` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `totalPagar` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `restaurante` ADD COLUMN `idUsuario` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `ubicacion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `apellido1` VARCHAR(191) NOT NULL,
    ADD COLUMN `apellido2` VARCHAR(191) NOT NULL,
    ADD COLUMN `idTipoUsuario` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
