"use server";
import { error } from "node:console";
// Importa funções do repository (acesso ao banco via Prisma)

import { del_Paciente, post_Paciente, get_AllPacientes, findPacienteById, updatePaciente } from "../repository/pacienteRepository";

/**
 * Buscar todos os pacientes
 *
 * Regra de negócio:
 * - Aqui não há validação porque listar é uma operação segura
 * - Apenas delega para o repository
 * - result vem do banco (Camada Repository) e é passado para o controller
 */

export async function pegar_Pacientes() {
  const result = await get_AllPacientes();
  return result;
}


export async function gravarPaciente(
  nome,
  status,
  cpf,
  rg,
  nascimento,
  profissao,
  tipoCancer,
  CIDprincipal,
  CIDsecundario,
  rua,
  numero,
  cep,
  bairro,
  cidade,
  telefone1,
  telefone2,
  sexo,
  prioridade
) {

  // Validação: campos obrigatórios do formulário (relaxada para aceitar campos opcionais do modal)
  if (!nome || !cpf || !rg || !nascimento || isNaN(new Date(nascimento).getTime()) || !sexo || !status || !prioridade) {
    throw new Error('Campos obrigatórios ausentes (nome, cpf, rg, nascimento, sexo, status, prioridade).');
  }


  // Se passou por todas regras pode salvar -> pode salvar
  try {
    return await post_Paciente({
      nome,
      status,
      cpf,
      rg,
      nascimento,
      profissao,
      tipoCancer,
      CIDprincipal,
      CIDsecundario: CIDsecundario || "",
      rua,
      numero,
      cep,
      bairro,
      cidade,
      telefone1,
      telefone2: telefone2 || "",
      sexo,
      prioridade
    });
  } catch (err) {
    // Tratamento de erro do Prisma para unique constraint
    if (err && err.code === 'P2002') {
      // Identifica qual campo causou o conflito, se possível
      const target = err.meta && err.meta.target ? err.meta.target.join(', ') : 'campo único';
      throw new Error(`Violação de unicidade: ${target} já cadastrado.`);
    }
    // Repassa outros erros
    throw err;
  }
}

/**
 * Deletar paciente
 *
 * Regra de negócio:
 * - Só pode deletar se o paciente existir (REMOVIDO PARA SIMPLICIDADE)
 * - Evita erro silencioso ou inconsistência
 */
export async function apaga_Paciente(id) {
  return await del_Paciente(Number(id));
}

/**
 * Atualizar paciente
 *
 * Regra de negócio:
 * - Antes de atualizar, precisamos garantir que o paciente existe
 * - Evita atualizar algo que não está no banco
 */
export async function updatePacienteService(id, data) {
  // Chamando a função de busca para garantir que o paciente existe
  const existe = await findPacienteById(Number(id));
  if (!existe) {
    throw new Error('Paciente não encontrado para atualizar');
  } else {
    console.log('Paciente encontrado para atualização:', existe);
  }
  const pacienteAtualizado = await updatePaciente(Number(id), data);

  return pacienteAtualizado;
}