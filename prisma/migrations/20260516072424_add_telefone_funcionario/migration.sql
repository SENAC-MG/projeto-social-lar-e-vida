/*
  Warnings:

  - You are about to drop the column `telefones` on the `Funcionarios` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Funcionarios" ("cargo", "email", "id", "nome") SELECT "cargo", "email", "id", "nome" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
