"use server";

// import { revalidatePath } from 'next/cache';
import {
    apaga_Funcionario,
    gravarFuncionario,
    pegar_Funcionarios,
    updateFuncionarioService,
} from "../services/funcionarioService";
import { formatError } from "../../../lib/formatError";
import {
    sanitizeString,
    sanitizeEmail,
    parseDate,
    sanitizeOptionalString,
} from "../../../lib/sanitize";
/**
 * Buscar todos os funcionários
 *
 * - Apenas delega para o service
 * - Não tem regra aqui porque é leitura simples
 * - Não preciso passar Argumentos
 */
export async function get_Funcionarios() {
    const dados = await pegar_Funcionarios();
    // Atualiza os dados da rota (refaz cache do Next.js)
    return dados;
}

export async function cadastrar_Funcionario(formData) {
    // Extração e Limpeza dos dados
    const nome = sanitizeString(formData.get("nome"));
    const email = sanitizeEmail(formData.get("email"));
    const cargo = sanitizeOptionalString(formData.get("cargo"));
    const telefone = sanitizeOptionalString(formData.get("telefone"));
    const status = sanitizeOptionalString(formData.get("status"));
    const dataContratacao = parseDate(formData.get("dataContratacao"));

    console.log("Dados recebidos no action:", {
        nome,
        email,
        cargo,
        telefone,
        status,
        dataContratacao,
    });

    try {
        // Regras de negócio estão no service
        await gravarFuncionario(nome, email, cargo, telefone, status, dataContratacao);
        //Voltando com a resposta conrolada para o frontend
        return {
            success: true,
            message: "Funcionário cadastrado com sucesso!",
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
 * Deletar Aluno
 *
 * Regras:
 * -> Service valida se o funcionário existe antes de excluir
 * -> Após deletar, revalida a listagem
 */
export async function deletar_Funcionario(id) {
    try {
        await apaga_Funcionario(id);
        return { success: true, message: "Funcionário deletado com sucesso!" };
    } catch (err) {
        return {
            success: false,
            error: formatError(err),
        };
    }
}

/**
 * Atualizar funcionário
 *
 * Regras:
 * - Todos os campos tem que ser atualizados
 * - Service garante que o funcionário existe
 */
export async function updateFuncionarioAction(id, formData) {
    const data = {};

    const nome = sanitizeString(formData.get("nome"));
    const email = sanitizeEmail(formData.get("email"));
    const cargo = sanitizeOptionalString(formData.get("cargo"));
    const telefone = sanitizeOptionalString(formData.get("telefone"));
    const status = sanitizeOptionalString(formData.get("status"));
    const dataContratacao = parseDate(formData.get("dataContratacao"));
    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (cargo) data.cargo = cargo;
    if (telefone) data.telefone = telefone;
    if (status) data.status = status;
    if (dataContratacao) data.dataContratacao = new Date(dataContratacao);

    try {
        const funcionarioAtualizado = await updateFuncionarioService(id, data);

        return {
            success: true,
            message: "Funcionário atualizado com sucesso!",
            funcionario: funcionarioAtualizado,
        };
    } catch (err) {
        return {
            success: false,
            error: formatError(err),
        };
    }
}
