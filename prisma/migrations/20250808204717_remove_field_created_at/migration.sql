/*
  Warnings:

  - You are about to drop the column `created_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `transactions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."transactions_created_at_idx";

-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
