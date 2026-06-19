-- AlterTable
ALTER TABLE "Emprestimo" ADD COLUMN     "materialId" INTEGER;

-- CreateTable
CREATE TABLE "Materiais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "quantidadeTotal" INTEGER NOT NULL DEFAULT 0,
    "quantidadeAtual" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Materiais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Materiais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
