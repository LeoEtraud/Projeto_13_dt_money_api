/*
  Warnings:

  - You are about to drop the column `createdAt` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "type" SET DEFAULT 'expense';

-- CreateIndex
CREATE INDEX "transactions_category_idx" ON "public"."transactions"("category");

-- CreateIndex
CREATE INDEX "transactions_created_at_idx" ON "public"."transactions"("created_at");
