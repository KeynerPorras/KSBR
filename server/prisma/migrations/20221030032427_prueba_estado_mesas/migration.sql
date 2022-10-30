/*
  Warnings:

  - The values [registrada,pendiente,enProceso,entregada,porPagar,pagada] on the enum `Mesa_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `mesa` MODIFY `estado` ENUM('reservada', 'ocupada') NOT NULL;
