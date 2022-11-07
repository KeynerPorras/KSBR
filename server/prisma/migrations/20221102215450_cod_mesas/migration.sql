/*
  Warnings:

  - Added the required column `codigo` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesa` ADD COLUMN `codigo` VARCHAR(191) NOT NULL,
    MODIFY `estado` ENUM('reservada', 'ocupada', 'libre', 'ordenRealizada', 'porPagar', 'inactiva') NOT NULL;
