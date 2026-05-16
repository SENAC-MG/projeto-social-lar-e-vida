/*
  Warnings:

  - Added the required column `id` to the `Servicos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Servicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "tipoServico" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "valorServico" REAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "tempoServico" TEXT NOT NULL
);
INSERT INTO "new_Servicos" ("cpf", "duracao", "nome", "tempoServico", "tipoServico", "unidade", "valorServico") SELECT "cpf", "duracao", "nome", "tempoServico", "tipoServico", "unidade", "valorServico" FROM "Servicos";
DROP TABLE "Servicos";
ALTER TABLE "new_Servicos" RENAME TO "Servicos";
CREATE UNIQUE INDEX "Servicos_cpf_key" ON "Servicos"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
