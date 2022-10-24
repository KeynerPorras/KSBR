/*
  Warnings:

  - You are about to alter the column `estado` on the `mesa` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("Mesa_estado")`.

*/
-- AlterTable
ALTER TABLE `mesa` MODIFY `estado` ENUM('disponible', 'ocupada', 'desabilitada', 'reservada') NOT NULL;
