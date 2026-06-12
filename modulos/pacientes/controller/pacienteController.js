"use server";

// import { revalidatePath } from 'next/cache';
import {
    apaga_Paciente,
    gravarPaciente,
    pegar_Pacientes,
    updatePacienteService,
} from "../services/pacienteService";
import { formatError } from "../../../lib/formatError";
import { sanitizeString, sanitizeOptionalString, parseDate } from "../../../lib/sanitize";
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
    const nome = sanitizeString(formData.get("nome"));
    const status = sanitizeOptionalString(formData.get("status"));
    const cpf = sanitizeString(formData.get("cpf"));
    const rg = sanitizeString(formData.get("rg"));
    const nascimento = parseDate(formData.get("nascimento"));
    const profissao = sanitizeOptionalString(formData.get("profissao"));
    const tipoCancer = sanitizeOptionalString(formData.get("tipoCancer"));
    const CIDprincipal = sanitizeOptionalString(formData.get("CIDprincipal"));
    const CIDsecundario = sanitizeOptionalString(formData.get("CIDsecundario"));
    const rua = sanitizeOptionalString(formData.get("rua"));
    const numero = sanitizeOptionalString(formData.get("numero"));
    const cep = sanitizeOptionalString(formData.get("cep"));
    const bairro = sanitizeOptionalString(formData.get("bairro"));
    const cidade = sanitizeOptionalString(formData.get("cidade"));
    const telefone1 = sanitizeOptionalString(formData.get("telefone1"));
    const telefone2 = sanitizeOptionalString(formData.get("telefone2"));
    const sexo = sanitizeOptionalString(formData.get("sexo"));
    const prioridade = sanitizeOptionalString(formData.get("prioridade"));

    console.log("Dados recebidos no action:", {
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
        prioridade,
    });

    try {
        // Regras de negócio estão no service
        await gravarPaciente(
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
        );
        //Voltando com a resposta controlada para o frontend
        return {
            success: true,
            message: "Paciente cadastrado com sucesso!",
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
 * Deletar Paciente
 *
 * Regras:
 * -> Service valida se o paciente existe antes de excluir
 * -> Após deletar, revalida a listagem
 */
export async function deletar_Paciente(id) {
    try {
        await apaga_Paciente(id);
        return { success: true, message: "Paciente deletado com sucesso!" };
    } catch (err) {
        return {
            success: false,
            error: formatError(err),
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

    const nome = sanitizeString(formData.get("nome"));
    const status = sanitizeOptionalString(formData.get("status"));
    const cpf = sanitizeString(formData.get("cpf"));
    const rg = sanitizeString(formData.get("rg"));
    const nascimento = parseDate(formData.get("nascimento"));
    const profissao = sanitizeOptionalString(formData.get("profissao"));
    const tipoCancer = sanitizeOptionalString(formData.get("tipoCancer"));
    const CIDprincipal = sanitizeOptionalString(formData.get("CIDprincipal"));
    const CIDsecundario = sanitizeOptionalString(formData.get("CIDsecundario"));
    const rua = sanitizeOptionalString(formData.get("rua"));
    const numero = sanitizeOptionalString(formData.get("numero"));
    const cep = sanitizeOptionalString(formData.get("cep"));
    const bairro = sanitizeOptionalString(formData.get("bairro"));
    const cidade = sanitizeOptionalString(formData.get("cidade"));
    const telefone1 = sanitizeOptionalString(formData.get("telefone1"));
    const telefone2 = sanitizeOptionalString(formData.get("telefone2"));
    const sexo = sanitizeOptionalString(formData.get("sexo"));
    const prioridade = sanitizeOptionalString(formData.get("prioridade"));

    if (nome) data.nome = nome;
    if (status) data.status = status;
    if (cpf) data.cpf = cpf;
    if (rg) data.rg = rg;
    if (nascimento) data.nascimento = new Date(nascimento);
    if (profissao) data.profissao = profissao;
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
            error: formatError(err),
        };
    }
}
