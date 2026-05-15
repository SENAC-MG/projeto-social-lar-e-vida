"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Funcionario, post_Funcionario, get_AllFuncionarios } from "../repository/funcionarioRepository";

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
  telefone
) {

  // Validação: campos obrigatórios
  if (!nome || !email || !cargo || !telefone) {
    throw new Error('Todos os campos são obrigatórios!');
  }


// Se passou por todas regras pode salvar -> pode salvar
return await post_Funcionario({
  nome,
  email,
  cargo,
  telefone
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