"use server";
// Importa funções do repository (acesso ao banco via Prisma)

import {
    del_Emprestimo,
    post_Emprestimo,
    get_AllEmprestimos,
    findEmprestimoById,
    updateEmprestimo,
} from "../repository/emprestimoRepository";
import {
    validateRequiredString,
    validateRequiredDate,
    validateOptionalDate,
    validateRequiredNumber,
} from "../../../lib/payloadValidation";

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
    quantidade,
    rua,
    numero,
    cep,
    bairro,
    cidade,
    telefone1,
    telefone2,
    status,
    previsaoDevolucao,
    dataDevolucao
) {
    const nomeValid = validateRequiredString(nome, "nome");
    const cpfValid = validateRequiredString(cpf, "cpf");
    const rgValid = validateRequiredString(rg, "rg");
    const nascimentoValid = validateRequiredDate(nascimento, "nascimento");
    const dataEmprestimoValid = validateRequiredDate(dataEmprestimo, "dataEmprestimo");
    const quantidadeValid = validateRequiredNumber(quantidade, "quantidade");
    const ruaValid = validateRequiredString(rua, "rua");
    const numeroValid = validateRequiredString(numero, "numero");
    const cepValid = validateRequiredString(cep, "cep");
    const bairroValid = validateRequiredString(bairro, "bairro");
    const cidadeValid = validateRequiredString(cidade, "cidade");
    const telefone1Valid = validateRequiredString(telefone1, "telefone1");
    const telefone2Valid = validateRequiredString(telefone2, "telefone2");
    const statusValid = validateRequiredString(status, "status");
    const previsaoValid = validateOptionalDate(previsaoDevolucao, "previsaoDevolucao");
    const devolucaoValid = validateOptionalDate(dataDevolucao, "dataDevolucao");

    // Se passou por todas regras pode salvar -> pode salvar
    return await post_Emprestimo({
        nome: nomeValid,
        cpf: cpfValid,
        rg: rgValid,
        nascimento: nascimentoValid,
        dataEmprestimo: dataEmprestimoValid,
        quantidade: quantidadeValid,
        rua: ruaValid,
        numero: numeroValid,
        cep: cepValid,
        bairro: bairroValid,
        cidade: cidadeValid,
        telefone1: telefone1Valid,
        telefone2: telefone2Valid,
        status: statusValid,
        previsaoDevolucao: previsaoValid,
        dataDevolucao: devolucaoValid,
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
        throw new Error("Empréstimo não encontrado para atualizar");
    }
    const emprestimoAtualizado = await updateEmprestimo(Number(id), data);

    return emprestimoAtualizado;
}
