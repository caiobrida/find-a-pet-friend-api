/*
  Warnings:

  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_id";
