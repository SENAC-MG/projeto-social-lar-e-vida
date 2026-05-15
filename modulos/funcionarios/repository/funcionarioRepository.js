import { prisma } from "@/lib/prisma";
/**
 * Buscar todos os funcionários
 *
 * - Retorna uma lista com todos os funcionários do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllFuncionarios() {
  const result = await prisma.funcionarios.findMany({
    orderBy: {
      nome: "asc",
    },
  });
  return result;
}
/**
 * - Criar novo Funcionário
 *
 * - Recebe um objeto com os dados do funcionário
 * - Ex: { nome, email, cargo }
 * - Retorna o funcionário criado
 */
export async function post_Funcionario(data) {
  const { nome, email, cargo, telefone } = data;
  return await prisma.funcionarios.create({
    data: {
      nome,
      email,
      cargo,
      telefone
    }
  });
  return result;
}
/**
 * Deletar funcionário
 *
 * - Remove o funcionário do banco pelo ID
 * - Cuidado: Operação irreversível
 */
export async function del_Funcionario(id) {
  const result = await prisma.funcionario.delete({
    where: { id },
  });
  return result;
}