/*
  Warnings:

  - You are about to drop the column `Estado` on the `mesa` table. All the data in the column will be lost.
  - Added the required column `estado` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesa` DROP COLUMN `Estado`,
    ADD COLUMN `estado` BOOLEAN NOT NULL;
