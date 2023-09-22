/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status_title" TEXT;

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_title_key" ON "Status"("title");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_status_title_fkey" FOREIGN KEY ("status_title") REFERENCES "Status"("title") ON DELETE SET NULL ON UPDATE CASCADE;
