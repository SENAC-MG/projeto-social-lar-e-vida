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
) {

  // Validação: campos obrigatórios
  if (!nome || !status || !cpf || !rg || !nascimento || !profissao || !dataCadastro || !tipoCancer || !CIDprincipal || !CIDsecundario || !rua || !numero || !cep || !bairro || !cidade || !telefone1 || !telefone2) {
    throw new Error('Todos os campos são obrigatórios!');
  }


  // Se passou por todas regras pode salvar -> pode salvar
  return await post_Paciente({
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
  });
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