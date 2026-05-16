"use server";

// import { revalidatePath } from 'next/cache';
import { apaga_Emprestimo, gravarEmprestimo, pegar_Emprestimos, updateEmprestimoService } from "../services/emprestimoService";
/**
 * Buscar todos os empréstimos
 *
 * - Apenas delega para o service
 * - Não tem regra aqui porque é leitura simples
 * - Não preciso passar Argumentos
 */
export async function get_Emprestimos() {
  const dados = await pegar_Emprestimos();
  // Atualiza os dados da rota (refaz cache do Next.js)
  return dados;
}

export async function cadastrar_Emprestimo(formData) {
  // Extração e Limpeza dos dados
  const nome = formData.get('nome')?.toString().trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const rg = formData.get('rg')?.toString().trim();
  const nascimento = new Date(formData.get('nascimento')?.toString().trim());
  const dataEmprestimo = new Date(formData.get('dataEmprestimo')?.toString().trim());
  const materiaisEmprestados = formData.get('materiaisEmprestados')?.toString().trim();
  const rua = formData.get('rua')?.toString().trim();
  const numero = formData.get('numero')?.toString().trim();
  const cep = formData.get('cep')?.toString().trim();
  const bairro = formData.get('bairro')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim();
  const telefone1 = formData.get('telefone1')?.toString().trim();
  const telefone2 = formData.get('telefone2')?.toString().trim();

  console.log('Dados recebidos no action:', { nome, cpf, rg, nascimento, dataEmprestimo, materiaisEmprestados, rua, numero, cep, bairro, cidade, telefone1, telefone2 });

  try {
    // Regras de negócio estão no service
    await gravarEmprestimo(nome, cpf, rg, nascimento, dataEmprestimo, materiaisEmprestados, rua, numero, cep, bairro, cidade, telefone1, telefone2);
    //Voltando com a resposta conrolada para o frontend
    return {
      success: true,
      message: 'Empréstimo cadastrado com sucesso!',
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
 * Deletar Empréstimo
 *
 * Regras:
 * -> Service valida se o empréstimo existe antes de excluir
 * -> Após deletar, revalida a listagem
 */
export async function deletar_Emprestimo(id) {
  try {
    await apaga_Emprestimo(id);
    return { success: true, message: 'Empréstimo deletado com sucesso!' }
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Atualizar empréstimo
 *
 * Regras:
 * - Todos os campos tem que ser atualizados
 * - Service garante que o empréstimo existe
 */
export async function updateEmprestimoAction(id, formData) {
  const nome = formData.get('nome')?.toString().trim();
  const cpf = formData.get('cpf')?.toString().trim();
  const rg = formData.get('rg')?.toString().trim();
  const nascimento = new Date(formData.get('nascimento')?.toString().trim());
  const dataEmprestimo = new Date(formData.get('dataEmprestimo')?.toString().trim());
  const materiaisEmprestados = formData.get('materiaisEmprestados')?.toString().trim();
  const rua = formData.get('rua')?.toString().trim();
  const numero = formData.get('numero')?.toString().trim();
  const cep = formData.get('cep')?.toString().trim();
  const bairro = formData.get('bairro')?.toString().trim();
  const cidade = formData.get('cidade')?.toString().trim();
  const telefone1 = formData.get('telefone1')?.toString().trim();
  const telefone2 = formData.get('telefone2')?.toString().trim();

  try {

    const emprestimoAtualizado = await updateEmprestimoService(id, { nome, cpf, rg, nascimento, dataEmprestimo, materiaisEmprestados, rua, numero, cep, bairro, cidade, telefone1, telefone2 });
    return { success: true, message: 'Empréstimo atualizado com sucesso!', emprestimo: emprestimoAtualizado };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}