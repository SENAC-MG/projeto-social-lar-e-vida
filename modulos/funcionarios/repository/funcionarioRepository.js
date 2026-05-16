import { prisma } from "../../../lib/prisma";
/**
 * Buscar todos os funcionários
 *
 * - Retorna uma lista com todos os funcionários do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllFuncionarios() {
  const result = await prisma.Funcionarios.findMany({
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
  return await prisma.Funcionarios.create({
    data: {
      nome,
      email,
      cargo,
      telefone
    }
  });
}
/**
 * Deletar funcionário
 *
 * - Remove o funcionário do banco pelo ID
 * - Cuidado: Operação irreversível
 */
export async function del_Funcionario(id) {
  const result = await prisma.Funcionarios.delete({
    where: { id },
  });
  return result;
}

/**
 * Buscar funcionário pelo ID
 *
 * - Busca um único funcionário pelo ID ( chave primária )
 * - Retorna null se não encontrar
 * - Usado em edição, detalhes, etc
 */
export async function findFuncionarioById(id) {
  const funcionario = await prisma.Funcionarios.findUnique({
    where: { id },
  });
  // Retorna o funcionário encontrado ou null se não existir
  return funcionario;
}

/**
 * - Recebe o ID do funcionário e os novos dados
 * - Atualiza apenas os campos enviados
 * - Retorna o aluno atualizado
 */
export async function updateFuncionario(id, data) {
  console.log('Atualizando aluno ID:', id, 'com dados', data);

  const Funcionario_atualizado = await prisma.Funcionarios.update({
    where: { id },
    data,
  });

  console.log('Funcionário atualizado com sucesso:', Funcionario_atualizado);
  return Funcionario_atualizado;
}