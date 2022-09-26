/*
  Warnings:

  - You are about to drop the column `idCliente` on the `comanda` table. All the data in the column will be lost.
  - You are about to drop the column `idMesero` on the `comanda` table. All the data in the column will be lost.
  - Added the required column `idUsuario` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comanda` DROP COLUMN `idCliente`,
    DROP COLUMN `idMesero`,
    ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mesa` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Mesa` ADD CONSTRAINT `Mesa_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `Comanda_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
