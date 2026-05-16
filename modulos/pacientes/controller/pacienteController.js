"use server";

// import { revalidatePath } from 'next/cache';
import { apaga_Paciente, gravarPaciente, pegar_Pacientes, updatePacienteService } from "../services/pacienteService";
/**
 * Buscar todos os pacientes
 *
 * - Apenas delega para o service
 * - Não tem regra aqui porque é leitura simples
 * - Não preciso passar Argumentos
 */
export async function get_Pacientes() {
  const dados = await pegar_Pacientes();
  // Atualiza os dados da rota (refaz cache do Next.js)
  return dados;
}

export async function cadastrar_Paciente(formData) {
  // Extração e Limpeza dos dados
  const nome = formData.get('nome')?.toString().trim();
  const status = formData.get('status')?.toString() === 'Ativo'.trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const rg = formData.get('rg')?.toString().trim();
  const nascimento = new Date(formData.get('nascimento')?.toString().trim());
  const profissao = formData.get('profissao')?.toString().trim();
  const dataCadastro = new Date(formData.get('dataCadastro')?.toString().trim());
  const tipoCancer = formData.get('tipoCancer')?.toString().trim();
  const CIDprincipal = formData.get('CIDprincipal')?.toString().trim();
  const CIDsecundario = formData.get('CIDsecundario')?.toString().trim();
  const rua = formData.get('rua')?.toString().trim();
  const numero = formData.get('numero')?.toString().trim();
  const cep = formData.get('cep')?.toString().trim();
  const bairro = formData.get('bairro')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim();
  const telefone1 = formData.get('telefone1')?.toString().trim();
  const telefone2 = formData.get('telefone2')?.toString().trim();

  console.log('Dados recebidos no action:', {
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

  try {
    // Regras de negócio estão no service
    await gravarPaciente(nome,
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
      telefone2);
    //Voltando com a resposta conrolada para o frontend
    return {
      success: true,
      message: 'Paciente cadastrado com sucesso!',
    };
  } catch (err) {
    // Retorna erro controlado para o frontend
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Deletar Paciente
 *
 * Regras:
 * -> Service valida se o paciente existe antes de excluir
 * -> Após deletar, revalida a listagem
 */
export async function deletar_Paciente(id) {
  try {
    await apaga_Paciente(id);
    return { success: true, message: 'Paciente deletado com sucesso!' }
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Atualizar paciente
 *
 * Regras:
 * - Todos os campos tem que ser atualizados
 * - Service garante que o paciente existe
 */
export async function updatePacienteAction(id, formData) {
  const nome = formData.get('nome')?.toString().trim();
  const status = formData.get('status')?.toString().trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const rg = formData.get('rg')?.toString().trim();
  const nascimento = formData.get('nascimento')?.toString().trim();
  const profissao = formData.get('profissao')?.toString().trim();
  const dataCadastro = formData.get('dataCadastro')?.toString().trim();
  const tipoCancer = formData.get('tipoCancer')?.toString().trim();
  const CIDprincipal = formData.get('CIDprincipal')?.toString().trim();
  const CIDsecundario = formData.get('CIDsecundario')?.toString().trim();
  const rua = formData.get('rua')?.toString().trim();
  const numero = formData.get('numero')?.toString().trim();
  const cep = formData.get('cep')?.toString().trim();
  const bairro = formData.get('bairro')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim();
  const telefone1 = formData.get('telefone1')?.toString().trim();
  const telefone2 = formData.get('telefone2')?.toString().trim();

  try {

    const PacienteAtualizado = await updatePacienteService(id, { nome, status, cpf, rg, nascimento, profissao, dataCadastro, tipoCancer, CIDprincipal, CIDsecundario, rua, numero, cep, bairro, cidade, telefone1, telefone2 });
    return { success: true, message: 'Paciente atualizado com sucesso!', Paciente: PacienteAtualizado };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}