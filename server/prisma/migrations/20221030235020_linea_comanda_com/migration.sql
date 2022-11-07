/*
  Warnings:

  - The primary key for the `lineacomanda` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `lineacomanda` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `idComanda`);
