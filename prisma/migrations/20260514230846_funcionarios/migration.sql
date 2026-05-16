-- CreateTable
CREATE TABLE "Pacientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "profissao" TEXT NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoCancer" TEXT NOT NULL,
    "CIDprincipal" TEXT NOT NULL,
    "CIDsecundario" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "telefone1" TEXT NOT NULL,
    "telefone2" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "dataEmprestimo" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "materiaisEmprestados" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "telefone1" TEXT NOT NULL,
    "telefone2" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Servicos" (
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "tipoServico" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "valorServico" REAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "tempoServico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefones" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_cpf_key" ON "Pacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Servicos_cpf_key" ON "Servicos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");
