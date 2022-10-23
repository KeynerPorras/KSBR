/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `restaurante` table. All the data in the column will be lost.
  - You are about to drop the column `idTipoUsuario` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurante` DROP COLUMN `idUsuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `idTipoUsuario`,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL;
