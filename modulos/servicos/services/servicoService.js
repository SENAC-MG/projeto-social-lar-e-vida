"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Servico, post_Servico, get_AllServicos, findServicoById, updateServico } from "../repository/servicoRepository";

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
  tempoServico
) {

  // Validação: campos obrigatórios
  if (!nome || !cpf || !tipoServico || !duracao || !valorServico || !unidade || !tempoServico) {
    throw new Error('Todos os campos são obrigatórios!');
  }


  // Se passou por todas regras pode salvar -> pode salvar
  return await post_Servico({
    nome,
    cpf,
    tipoServico,
    duracao,
    valorServico,
    unidade,
    tempoServico
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
  const servicoAtualizado = await updateServico(Number(id), data);

  return servicoAtualizado;
}