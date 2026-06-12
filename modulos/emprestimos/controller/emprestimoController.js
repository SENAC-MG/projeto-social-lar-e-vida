"use server";

// import { revalidatePath } from 'next/cache';
import {
    apaga_Emprestimo,
    gravarEmprestimo,
    pegar_Emprestimos,
    updateEmprestimoService,
} from "../services/emprestimoService";
import { formatError } from "../../../lib/formatError";
import {
    sanitizeString,
    sanitizeOptionalString,
    parseDate,
    parseIntegerValue,
} from "../../../lib/sanitize";
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
    const nome = sanitizeString(formData.get("nome"));
    const cpf = sanitizeString(formData.get("cpf"));
    const rg = sanitizeString(formData.get("rg"));
    const nascimento = parseDate(formData.get("nascimento"));
    const dataEmprestimo = parseDate(formData.get("dataEmprestimo"));
    const quantidade = parseIntegerValue(formData.get("quantidade"));
    const rua = sanitizeOptionalString(formData.get("rua"));
    const numero = sanitizeOptionalString(formData.get("numero"));
    const cep = sanitizeOptionalString(formData.get("cep"));
    const bairro = sanitizeOptionalString(formData.get("bairro"));
    const cidade = sanitizeOptionalString(formData.get("cidade"));
    const telefone1 = sanitizeOptionalString(formData.get("telefone1"));
    const telefone2 = sanitizeOptionalString(formData.get("telefone2"));
    const status = sanitizeOptionalString(formData.get("status"));
    const previsaoDevolucao = parseDate(formData.get("previsaoDevolucao"));
    const dataDevolucao = parseDate(formData.get("dataDevolucao"));

    console.log("Dados recebidos no action:", {
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
        dataDevolucao,
    });

    try {
        // Regras de negócio estão no service
        await gravarEmprestimo(
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
        );
        //Voltando com a resposta conrolada para o frontend
        return {
            success: true,
            message: "Empréstimo cadastrado com sucesso!",
        };
    } catch (err) {
        // Retorna erro controlado para o frontend
        return {
            success: false,
            error: formatError(err),
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
        return { success: true, message: "Empréstimo deletado com sucesso!" };
    } catch (err) {
        return {
            success: false,
            error: formatError(err),
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
    const data = {};

    const nome = sanitizeString(formData.get("nome"));
    const cpf = sanitizeString(formData.get("cpf"));
    const rg = sanitizeString(formData.get("rg"));
    const nascimento = parseDate(formData.get("nascimento"));
    const dataEmprestimo = parseDate(formData.get("dataEmprestimo"));
    const quantidade = parseIntegerValue(formData.get("quantidade"));
    const rua = sanitizeOptionalString(formData.get("rua"));
    const numero = sanitizeOptionalString(formData.get("numero"));
    const cep = sanitizeOptionalString(formData.get("cep"));
    const bairro = sanitizeOptionalString(formData.get("bairro"));
    const cidade = sanitizeOptionalString(formData.get("cidade"));
    const telefone1 = sanitizeOptionalString(formData.get("telefone1"));
    const telefone2 = sanitizeOptionalString(formData.get("telefone2"));
    const status = sanitizeOptionalString(formData.get("status"));
    const previsaoDevolucao = parseDate(formData.get("previsaoDevolucao"));
    const dataDevolucao = parseDate(formData.get("dataDevolucao"));

    if (nome) data.nome = nome;
    if (cpf) data.cpf = cpf;
    if (rg) data.rg = rg;
    if (nascimento) data.nascimento = new Date(nascimento);
    if (dataEmprestimo) data.dataEmprestimo = new Date(dataEmprestimo);
    if (quantidade !== undefined) data.quantidade = quantidade;
    if (rua) data.rua = rua;
    if (numero) data.numero = numero;
    if (cep) data.cep = cep;
    if (bairro) data.bairro = bairro;
    if (cidade) data.cidade = cidade;
    if (telefone1) data.telefone1 = telefone1;
    if (telefone2) data.telefone2 = telefone2;
    if (status) data.status = status;
    if (previsaoDevolucao) data.previsaoDevolucao = new Date(previsaoDevolucao);
    if (dataDevolucao) data.dataDevolucao = new Date(dataDevolucao);

    try {
        const emprestimoAtualizado = await updateEmprestimoService(id, data);

        return {
            success: true,
            message: "Empréstimo atualizado com sucesso!",
            emprestimo: emprestimoAtualizado,
        };
    } catch (err) {
        return {
            success: false,
            error: formatError(err),
        };
    }
}
