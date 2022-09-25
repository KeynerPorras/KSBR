-- CreateTable
CREATE TABLE `TipoUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idTipoUsuario` INTEGER NOT NULL,
    `idRestaurante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `IdIngredientes` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingrediente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProducto` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRestaurante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comanda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idMesa` INTEGER NOT NULL,
    `idCliente` INTEGER NOT NULL,
    `idMesero` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LineaComanda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idComanda` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `notas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductoToRestaurante` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductoToRestaurante_AB_unique`(`A`, `B`),
    INDEX `_ProductoToRestaurante_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idTipoUsuario_fkey` FOREIGN KEY (`idTipoUsuario`) REFERENCES `TipoUsuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingrediente` ADD CONSTRAINT `Ingrediente_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesa` ADD CONSTRAINT `Mesa_idRestaurante_fkey` FOREIGN KEY (`idRestaurante`) REFERENCES `Restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineaComanda` ADD CONSTRAINT `LineaComanda_idComanda_fkey` FOREIGN KEY (`idComanda`) REFERENCES `Comanda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineaComanda` ADD CONSTRAINT `LineaComanda_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductoToRestaurante` ADD CONSTRAINT `_ProductoToRestaurante_A_fkey` FOREIGN KEY (`A`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductoToRestaurante` ADD CONSTRAINT `_ProductoToRestaurante_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurante`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
