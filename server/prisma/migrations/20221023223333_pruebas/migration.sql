/*
  Warnings:

  - The values [disponible,ocupada,desabilitada,reservada] on the enum `Mesa_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `mesa` MODIFY `estado` ENUM('listo', 'pendiente') NOT NULL;
