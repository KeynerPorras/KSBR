/*
  Warnings:

  - You are about to drop the `ingrediente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientes` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ingrediente` DROP FOREIGN KEY `Ingrediente_idProducto_fkey`;

-- AlterTable
ALTER TABLE `producto` ADD COLUMN `ingredientes` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ingrediente`;
