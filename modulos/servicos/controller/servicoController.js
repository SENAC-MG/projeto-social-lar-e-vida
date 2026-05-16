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

  console.log('Dados recebidos no action:', { nome, cpf, tipoServico, duracao, valorServico, unidade, tempoServico });

  try {
    // Regras de negócio estão no service
    await gravarServico(nome, cpf, tipoServico, duracao, valorServico, unidade, tempoServico);
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
  const nome = formData.get('nome')?.toString().trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const tipoServico = formData.get('tipoServico')?.toString().trim();
  const duracao = formData.get('duracao')?.toString().trim();
  const valorServico = Number(formData.get('valorServico'));
  const unidade = formData.get('unidade')?.toString().trim();
  const tempoServico = formData.get('tempoServico')?.toString().trim();

  try {

    const servicoAtualizado = await updateServicoService(id, { nome, cpf, tipoServico, duracao, valorServico, unidade, tempoServico });
    return { success: true, message: 'Serviço atualizado com sucesso!', servico: servicoAtualizado };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}