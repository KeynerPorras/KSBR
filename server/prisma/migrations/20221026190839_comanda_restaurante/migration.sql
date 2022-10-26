/*
  Warnings:

  - Added the required column `idRestaurante` to the `Comanda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comanda` ADD COLUMN `idRestaurante` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `Comanda_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
