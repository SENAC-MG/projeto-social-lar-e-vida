"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Emprestimo, post_Emprestimo, get_AllEmprestimos, findEmprestimoById, updateEmprestimo } from "../repository/emprestimoRepository";

/**
 * Buscar todos os empréstimos
 *
 * Regra de negócio:
 * - Aqui não há validação porque listar é uma operação segura
 * - Apenas delega para o repository
 * - result vem do banco (Camada Repository) e é passado para o controller
 */

export async function pegar_Emprestimos() {
  const result = await get_AllEmprestimos();
  return result;
}


export async function gravarEmprestimo(
  nome,
  cpf,
  rg,
  nascimento,
  dataEmprestimo,
  materiaisEmprestados,
  rua,
  numero,
  cep,
  bairro,
  cidade,
  telefone1,
  telefone2
) {

  // Validação: campos obrigatórios
  if (!nome || !cpf || !rg || !nascimento || !dataEmprestimo || !materiaisEmprestados || !rua || !numero || !cep || !bairro || !cidade || !telefone1 || !telefone2) {
    throw new Error('Todos os campos são obrigatórios!');
  }


  // Se passou por todas regras pode salvar -> pode salvar
  return await post_Emprestimo({
    nome,
    cpf,
    rg,
    nascimento,
    dataEmprestimo,
    materiaisEmprestados,
    rua,
    numero,
    cep,
    bairro,
    cidade,
    telefone1,
    telefone2
  });
}

/**
 * Deletar empréstimo
 *
 * Regra de negócio:
 * - Só pode deletar se o empréstimo existir (REMOVIDO PARA SIMPLICIDADE)
 * - Evita erro silencioso ou inconsistência
 */
export async function apaga_Emprestimo(id) {
  return await del_Emprestimo(Number(id));
}

/**
 * Atualizar empréstimo
 *
 * Regra de negócio:
 * - Antes de atualizar, precisamos garantir que o empréstimo existe
 * - Evita atualizar algo que não está no banco
 */
export async function updateEmprestimoService(id, data) {
  // Chamando a função de busca para garantir que o empréstimo existe
  const existe = await findEmprestimoById(Number(id));
  if (!existe) {
    throw new Error('Empréstimo não encontrado para atualizar');
  } else {
    console.log('Empréstimo encontrado para atualização:', existe);
  }
  const emprestimoAtualizado = await updateEmprestimo(Number(id), data);

  return emprestimoAtualizado;
}