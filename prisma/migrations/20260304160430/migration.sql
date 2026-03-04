-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "qrCode" TEXT,
    "cloudID" TEXT,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ticket" ("cloudID", "code", "createdAt", "id", "qrCode", "used") SELECT "cloudID", "code", "createdAt", "id", "qrCode", "used" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE UNIQUE INDEX "Ticket_code_key" ON "Ticket"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
