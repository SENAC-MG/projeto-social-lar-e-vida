/*
  Warnings:

  - You are about to drop the column `materiaisEmprestados` on the `Emprestimo` table. All the data in the column will be lost.
  - Added the required column `sexo` to the `Pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emprestimo" DROP COLUMN "materiaisEmprestados",
ADD COLUMN     "dataDevolucao" TIMESTAMP(3),
ADD COLUMN     "previsaoDevolucao" TIMESTAMP(3),
ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE "Funcionarios" ADD COLUMN     "dataContratacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE "Pacientes" ADD COLUMN     "prioridade" TEXT NOT NULL DEFAULT 'media',
ADD COLUMN     "sexo" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ativo',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Servicos" ADD COLUMN     "dataServico" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "funcionarioResponsavel" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pendente';
