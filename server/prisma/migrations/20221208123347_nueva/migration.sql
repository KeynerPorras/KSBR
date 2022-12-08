-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_idRestaurante_fkey`;

-- AlterTable
ALTER TABLE `lineacomanda` MODIFY `notas` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `idRestaurante` INTEGER NULL,
    MODIFY `rol` ENUM('administrador', 'cliente', 'mesero') NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
