/*
  Warnings:

  - You are about to drop the column `content` on the `Checkouts` table. All the data in the column will be lost.
  - Added the required column `professionalId` to the `Checkouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Checkouts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Professional" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checkouts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "professionalId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "Checkouts_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checkouts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checkouts" ("id", "patientId", "sessionId", "status") SELECT "id", "patientId", "sessionId", "status" FROM "Checkouts";
DROP TABLE "Checkouts";
ALTER TABLE "new_Checkouts" RENAME TO "Checkouts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Professional_name_key" ON "Professional"("name");
