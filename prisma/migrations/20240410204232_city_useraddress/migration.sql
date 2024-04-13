/*
  Warnings:

  - Added the required column `city` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userAddress" ADD COLUMN     "city" TEXT NOT NULL;
