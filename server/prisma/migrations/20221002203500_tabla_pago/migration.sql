/*
  Warnings:

  - You are about to drop the column `TipoPago` on the `comanda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comanda` DROP COLUMN `TipoPago`;

-- CreateTable
CREATE TABLE `DetallePago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TipoPago` ENUM('tarjeta', 'efectivo', 'ambas') NOT NULL,
    `montoEfectivo` DECIMAL(10, 2) NOT NULL,
    `montoTarjeta` DECIMAL(10, 2) NOT NULL,
    `idComanda` INTEGER NOT NULL,

    UNIQUE INDEX `DetallePago_idComanda_key`(`idComanda`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetallePago` ADD CONSTRAINT `DetallePago_idComanda_fkey` FOREIGN KEY (`idComanda`) REFERENCES `Comanda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
