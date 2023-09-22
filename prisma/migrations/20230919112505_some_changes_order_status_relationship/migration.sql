/*
  Warnings:

  - You are about to drop the column `status_title` on the `Order` table. All the data in the column will be lost.
  - Added the required column `statusTitle` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_status_title_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status_title",
ADD COLUMN     "statusTitle" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_statusTitle_fkey" FOREIGN KEY ("statusTitle") REFERENCES "Status"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
