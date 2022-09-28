/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `mesa` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTipoUsuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `tipousuario` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capacidad` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comanda` DROP FOREIGN KEY `Comanda_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `mesa` DROP FOREIGN KEY `Mesa_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_idTipoUsuario_fkey`;

-- AlterTable
ALTER TABLE `comanda` MODIFY `idMesa` INTEGER NULL,
    MODIFY `idUsuario` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mesa` DROP COLUMN `idUsuario`,
    ADD COLUMN `capacidad` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `idTipoUsuario`,
    ADD COLUMN `rol` ENUM('ADMINISTRADOR', 'CLIENTE', 'MESERO') NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `tipousuario`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_id_key` ON `Usuario`(`id`);

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `Comanda_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `Comanda_idMesa_fkey` FOREIGN KEY (`idMesa`) REFERENCES `Mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
