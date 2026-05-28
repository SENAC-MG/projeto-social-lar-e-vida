"use server";

// import { revalidatePath } from 'next/cache';
import { apaga_Servico, gravarServico, pegar_Servicos, updateServicoService } from "../services/servicoService";
/**
 * Buscar todos os serviços
 *
 * - Apenas delega para o service
 * - Não tem regra aqui porque é leitura simples
 * - Não preciso passar Argumentos
 */
export async function get_Servicos() {
  const dados = await pegar_Servicos();
  // Atualiza os dados da rota (refaz cache do Next.js)
  return dados;
}

export async function cadastrar_Servico(formData) {
  // Extração e Limpeza dos dados
  const nome = formData.get('nome')?.toString().trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const tipoServico = formData.get('tipoServico')?.toString().trim();
  const duracao = formData.get('duracao')?.toString().trim();
  const valorServico = Number(formData.get('valorServico'));
  const unidade = formData.get('unidade')?.toString().trim();
  const tempoServico = formData.get('tempoServico')?.toString().trim();
  const status = formData.get('status')?.toString()?.toString().trim();
  const dataServico = new Date(formData.get('dataServico')?.toString().trim());
  const funcionarioResponsavel = formData.get('funcionarioResponsavel')?.toString().trim();

  console.log('Dados recebidos no action:', { nome, cpf, tipoServico, duracao, valorServico, unidade, tempoServico, status, dataServico, funcionarioResponsavel });

  try {
    // Regras de negócio estão no service
    await gravarServico(nome, cpf, tipoServico, duracao, valorServico, unidade, tempoServico, status, dataServico, funcionarioResponsavel);
    //Voltando com a resposta conrolada para o frontend
    return {
      success: true,
      message: 'Serviço cadastrado com sucesso!',
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
 * Deletar Serviço
 *
 * Regras:
 * -> Service valida se o serviço existe antes de excluir
 * -> Após deletar, revalida a listagem
 */
export async function deletar_Servico(id) {
  try {
    await apaga_Servico(id);
    return { success: true, message: 'Serviço deletado com sucesso!' }
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Atualizar serviço
 *
 * Regras:
 * - Todos os campos tem que ser atualizados
 * - Service garante que o serviço existe
 */
export async function updateServicoAction(id, formData) {
  const data = {};

  const nome = formData.get("nome")?.toString().trim();
  const cpf = formData.get("cpf")?.toString().trim();
  const tipoServico = formData.get("tipoServico")?.toString().trim();
  const duracao = formData.get("duracao")?.toString().trim();
  const valorServico = formData.get("valorServico")?.toString();
  const unidade = formData.get("unidade")?.toString().trim();
  const tempoServico = formData.get("tempoServico")?.toString().trim();
  const status = formData.get("status")?.toString().trim();
  const dataServico = formData.get("dataServico")?.toString().trim();
  const funcionarioResponsavel = formData.get("funcionarioResponsavel")?.toString().trim();

  if (nome) data.nome = nome;
  if (cpf) data.cpf = cpf;
  if (tipoServico) data.tipoServico = tipoServico;
  if (duracao) data.duracao = duracao;
  if (valorServico) data.valorServico = Number(valorServico);
  if (unidade) data.unidade = unidade;
  if (tempoServico) data.tempoServico = tempoServico;
  if (status) data.status = status;
  if (dataServico) data.dataServico = new Date(dataServico);
  if (funcionarioResponsavel) data.funcionarioResponsavel = funcionarioResponsavel;

  try {
    const servicoAtualizado = await updateServicoService(id, data);

    return {
      success: true,
      message: "Serviço atualizado com sucesso!",
      servico: servicoAtualizado,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}