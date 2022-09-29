/*
  Warnings:

  - You are about to drop the column `precio` on the `lineacomanda` table. All the data in the column will be lost.
  - Added the required column `direccion` to the `Comanda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comanda` ADD COLUMN `direccion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lineacomanda` DROP COLUMN `precio`;
