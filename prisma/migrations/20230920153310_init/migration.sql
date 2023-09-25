-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checkouts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "professionalId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "Checkouts_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Checkouts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checkouts" ("date", "id", "patientId", "professionalId", "sessionId", "status", "time", "url") SELECT "date", "id", "patientId", "professionalId", "sessionId", "status", "time", "url" FROM "Checkouts";
DROP TABLE "Checkouts";
ALTER TABLE "new_Checkouts" RENAME TO "Checkouts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
