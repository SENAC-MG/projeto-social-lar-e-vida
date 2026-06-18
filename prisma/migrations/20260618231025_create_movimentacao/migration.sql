-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Movimentacao_pacienteId_idx" ON "Movimentacao"("pacienteId");

-- CreateIndex
CREATE INDEX "Movimentacao_servicoId_idx" ON "Movimentacao"("servicoId");

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
