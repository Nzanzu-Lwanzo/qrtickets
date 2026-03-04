/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ticket_code_key" ON "Ticket"("code");
