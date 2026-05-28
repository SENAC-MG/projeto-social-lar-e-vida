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
  const status = formData.get('status')?.toString()?.toString().trim();
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
  const sexo = formData.get('sexo')?.toString().trim();
  const prioridade = formData.get('prioridade')?.toString().trim();

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
    telefone2,
    sexo,
    prioridade,
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
      telefone2,
      sexo,
      prioridade
    );
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
  const data = {};

  const nome = formData.get("nome")?.toString().trim();
  const status = formData.get("status")?.toString();
  const cpf = formData.get("cpf")?.toString().trim();
  const rg = formData.get("rg")?.toString().trim();
  const nascimento = formData.get("nascimento")?.toString();
  const profissao = formData.get("profissao")?.toString().trim();
  const dataCadastro = formData.get("dataCadastro")?.toString();
  const tipoCancer = formData.get("tipoCancer")?.toString().trim();
  const CIDprincipal = formData.get("CIDprincipal")?.toString().trim();
  const CIDsecundario = formData.get("CIDsecundario")?.toString().trim();
  const rua = formData.get("rua")?.toString().trim();
  const numero = formData.get("numero")?.toString().trim();
  const cep = formData.get("cep")?.toString().trim();
  const bairro = formData.get("bairro")?.toString().trim();
  const cidade = formData.get("cidade")?.toString().trim();
  const telefone1 = formData.get("telefone1")?.toString().trim();
  const telefone2 = formData.get("telefone2")?.toString().trim();
  const sexo = formData.get("sexo")?.toString().trim();
  const prioridade = formData.get("prioridade")?.toString().trim();

  if (nome) data.nome = nome;
  if (status) data.status = status === "Ativo";
  if (cpf) data.cpf = cpf;
  if (rg) data.rg = rg;
  if (nascimento) data.nascimento = new Date(nascimento);
  if (profissao) data.profissao = profissao;
  if (dataCadastro) data.dataCadastro = new Date(dataCadastro);
  if (tipoCancer) data.tipoCancer = tipoCancer;
  if (CIDprincipal) data.CIDprincipal = CIDprincipal;
  if (CIDsecundario) data.CIDsecundario = CIDsecundario;
  if (rua) data.rua = rua;
  if (numero) data.numero = numero;
  if (cep) data.cep = cep;
  if (bairro) data.bairro = bairro;
  if (cidade) data.cidade = cidade;
  if (telefone1) data.telefone1 = telefone1;
  if (telefone2) data.telefone2 = telefone2;
  if (sexo) data.sexo = sexo;
  if (prioridade) data.prioridade = prioridade;

  try {
    const pacienteAtualizado = await updatePacienteService(id, data);

    return {
      success: true,
      message: "Paciente atualizado com sucesso!",
      paciente: pacienteAtualizado,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}