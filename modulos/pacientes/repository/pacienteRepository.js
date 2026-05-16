import { prisma } from "../../../lib/prisma";
/**
 * Buscar todos os pacientes
 *
 * - Retorna uma lista com todos os pacientes do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllPacientes() {
  const result = await prisma.Pacientes.findMany({
    orderBy: {
      nome: "asc",
    },
  });
  return result;
}
/**
* - Criar novo Paciente
 *
 * - Recebe um objeto com os dados do paciente
 * - Ex: { nome, status, cpf }
 * - Retorna o paciente criado
 */
export async function post_Paciente(data) {
  const { nome, status, cpf, rg, nascimento, profissao, dataCadastro, tipoCancer, CIDprincipal, CIDsecundario, rua, numero, cep, bairro, cidade, telefone1, telefone2 } = data;
  return await prisma.Pacientes.create({
    data: {
      nome,
      status,
      cpf,
      rg,
      nascimento,
      profissao,
      dataCadastro,
      tipoCancer,
      CIDprincipal,
      CIDsecundario,
      rua,
      numero,
      cep,
      bairro,
      cidade,
      telefone1,
      telefone2
    }
  });
}
/**
 * Deletar paciente
 *
 * - Remove o paciente do banco pelo ID
 * - Cuidado: Operação irreversível
 */
export async function del_Paciente(id) {
  const result = await prisma.Pacientes.delete({
    where: { id },
  });
  return result;
}

/**
 * Buscar paciente pelo ID
 *
 * - Busca um único paciente pelo ID ( chave primária )
 * - Retorna null se não encontrar
 * - Usado em edição, detalhes, etc
 */
export async function findPacienteById(id) {
  const paciente = await prisma.Pacientes.findUnique({
    where: { id },
  });
  // Retorna o paciente encontrado ou null se não existir
  return paciente;
}

/**
 * - Recebe o ID do paciente e os novos dados
 * - Atualiza apenas os campos enviados
 * - Retorna o paciente atualizado
 */
export async function updatePaciente(id, data) {
  console.log('Atualizando Paciente ID:', id, 'com dados', data);

  const Paciente_atualizado = await prisma.Pacientes.update({
    where: { id },
    data,
  });

  console.log('Paciente atualizado com sucesso:', Paciente_atualizado);
  return Paciente_atualizado;
}