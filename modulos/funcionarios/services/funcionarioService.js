"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Funcionario, post_Funcionario, get_AllFuncionarios, findFuncionarioById, updateFuncionario } from "../repository/funcionarioRepository";
import {
  validateEmail,
  validateRequiredString,
  validateRequiredDate,
  validateOptionalString,
} from "../../../lib/payloadValidation";

/**
 * Buscar todos os alunos
 *
 * Regra de negócio:
 * - Aqui não há validação porque listar é uma operação segura
 * - Apenas delega para o repository
 * - result vem do banco (Camada Repository) e é passado para o controller
 */

export async function pegar_Funcionarios() {
  const result = await get_AllFuncionarios();
  return result;
}


export async function gravarFuncionario(
  nome,
  email,
  cargo,
  telefone,
  status,
  dataContratacao
) {

  const nomeValid = validateRequiredString(nome, 'nome');
  const emailValid = validateEmail(email, 'email');
  const cargoValid = validateRequiredString(cargo, 'cargo');
  const telefoneValid = validateRequiredString(telefone, 'telefone');
  const statusValid = validateRequiredString(status, 'status');
  const dataContratacaoValid = validateRequiredDate(dataContratacao, 'dataContratacao');

  return await post_Funcionario({
    nome: nomeValid,
    email: emailValid,
    cargo: cargoValid,
    telefone: telefoneValid,
    status: statusValid,
    dataContratacao: dataContratacaoValid,
  });
}

/**
 * Deletar funcionário
 *
 * Regra de negócio:
 * - Só pode deletar se o aluno existir (REMOVIDO PARA SIMPLICIDADE)
 * - Evita erro silencioso ou inconsistência
 */
export async function apaga_Funcionario(id) {
  return await del_Funcionario(Number(id));
}

/**
 * Valida dados de atualização de funcionário.
 */
function validateFuncionarioUpdateData(data) {
  if (data.nome !== undefined) data.nome = validateRequiredString(data.nome, 'nome');
  if (data.email !== undefined) data.email = validateEmail(data.email, 'email');
  if (data.cargo !== undefined) data.cargo = validateRequiredString(data.cargo, 'cargo');
  if (data.telefone !== undefined) data.telefone = validateRequiredString(data.telefone, 'telefone');
  if (data.status !== undefined) data.status = validateRequiredString(data.status, 'status');
  if (data.dataContratacao !== undefined) data.dataContratacao = validateRequiredDate(data.dataContratacao, 'dataContratacao');
  return data;
}

/**
 * Atualizar aluno
 *
 * Regra de negócio:
 * - Antes de atualizar, precisamos garantir que o aluno existe
 * - Evita atualizar algo que não está no banco
 */
export async function updateFuncionarioService(id, data) {
  // Chamando a função de busca para garantir que o funcionário existe
  const existe = await findFuncionarioById(Number(id));
  if (!existe) {
    throw new Error('Funcionário não encontrado para atualizar');
  } else {
    console.log('Funcionário encontrado para atualização:', existe);
  }
  validateFuncionarioUpdateData(data);
  const funcionarioAtualizado = await updateFuncionario(Number(id), data);

  return funcionarioAtualizado;
}