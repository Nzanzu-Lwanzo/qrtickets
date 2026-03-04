/*
  Warnings:

  - Added the required column `cloudID` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "cloudID" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);
INSERT INTO "new_Ticket" ("code", "createdAt", "id", "qrCode") SELECT "code", "createdAt", "id", "qrCode" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
