/*
  Warnings:

  - The primary key for the `detallepago` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TipoPago` on the `detallepago` table. All the data in the column will be lost.
  - You are about to drop the column `montoEfectivo` on the `detallepago` table. All the data in the column will be lost.
  - You are about to drop the column `montoTarjeta` on the `detallepago` table. All the data in the column will be lost.
  - Added the required column `idTipo` to the `DetallePago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monto` to the `DetallePago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detallepago` DROP PRIMARY KEY,
    DROP COLUMN `TipoPago`,
    DROP COLUMN `montoEfectivo`,
    DROP COLUMN `montoTarjeta`,
    ADD COLUMN `idTipo` INTEGER NOT NULL,
    ADD COLUMN `monto` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`id`, `idTipo`);

-- CreateTable
CREATE TABLE `TipoPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetallePago` ADD CONSTRAINT `DetallePago_idTipo_fkey` FOREIGN KEY (`idTipo`) REFERENCES `TipoPago`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
