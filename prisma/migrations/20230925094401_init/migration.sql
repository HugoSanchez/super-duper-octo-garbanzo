/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Checkouts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Checkouts_sessionId_key" ON "Checkouts"("sessionId");
