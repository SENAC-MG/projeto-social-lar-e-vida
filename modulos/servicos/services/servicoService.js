"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Servico, post_Servico, get_AllServicos, findServicoById, updateServico } from "../repository/servicoRepository";
import {
  validateRequiredString,
  validateOptionalString,
  validateRequiredDate,
  validateRequiredNumber,
} from "../../../lib/payloadValidation";

/**
 * Buscar todos os serviços
 *
 * Regra de negócio:
 * - Aqui não há validação porque listar é uma operação segura
 * - Apenas delega para o repository
 * - result vem do banco (Camada Repository) e é passado para o controller
 */

export async function pegar_Servicos() {
  const result = await get_AllServicos();
  return result;
}


export async function gravarServico(
  nome,
  cpf,
  tipoServico,
  duracao,
  valorServico,
  unidade,
  tempoServico,
  status,
  dataServico,
  funcionarioResponsavel
) {

  const nomeValid = validateRequiredString(nome, 'nome');
  const cpfValid = validateRequiredString(cpf, 'cpf');
  const tipoServicoValid = validateRequiredString(tipoServico, 'tipoServico');
  const duracaoValid = validateRequiredString(duracao, 'duracao');
  const valorServicoValid = validateRequiredNumber(valorServico, 'valorServico');
  const unidadeValid = validateRequiredString(unidade, 'unidade');
  const tempoServicoValid = validateRequiredString(tempoServico, 'tempoServico');
  const statusValid = validateRequiredString(status, 'status');
  const dataServicoValid = validateRequiredDate(dataServico, 'dataServico');
  const funcionarioResponsavelValid = validateOptionalString(funcionarioResponsavel, 'funcionarioResponsavel');

  return await post_Servico({
    nome: nomeValid,
    cpf: cpfValid,
    tipoServico: tipoServicoValid,
    duracao: duracaoValid,
    valorServico: valorServicoValid,
    unidade: unidadeValid,
    tempoServico: tempoServicoValid,
    status: statusValid,
    dataServico: dataServicoValid,
    funcionarioResponsavel: funcionarioResponsavelValid,
  });
}

/**
 * Deletar serviço
 *
 * Regra de negócio:
 * - Só pode deletar se o serviço existir (REMOVIDO PARA SIMPLICIDADE)
 * - Evita erro silencioso ou inconsistência
 */
export async function apaga_Servico(id) {
  return await del_Servico(Number(id));
}

/**
 * Atualizar serviço
 *
 * Regra de negócio:
 * - Antes de atualizar, precisamos garantir que o serviço existe
 * - Evita atualizar algo que não está no banco
 */
export async function updateServicoService(id, data) {
  // Chamando a função de busca para garantir que o serviço existe
  const existe = await findServicoById(Number(id));
  if (!existe) {
    throw new Error('Serviço não encontrado para atualizar');
  } else {
    console.log('Serviço encontrado para atualização:', existe);
  }
  validateServicoUpdateData(data);
  const servicoAtualizado = await updateServico(Number(id), data);

  return servicoAtualizado;
}