/*
  Warnings:

  - The primary key for the `lineacomanda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `lineacomanda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lineacomanda` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`idComanda`, `idProducto`);
