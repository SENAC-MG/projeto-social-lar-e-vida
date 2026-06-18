"use server";

// Importa funções do repository (acesso ao banco via Prisma)

import {
    del_Paciente,
    post_Paciente,
    get_AllPacientes,
    findPacienteById,
    updatePaciente,
} from "../repository/pacienteRepository";
import {
    validateRequiredString,
    validateOptionalString,
    validateRequiredDate,
} from "../../../lib/payloadValidation";

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
    fotoUrl
) {
    const nomeValid = validateRequiredString(nome, "nome");
    const statusValid = validateRequiredString(status, "status");
    const cpfValid = validateRequiredString(cpf, "cpf");
    const rgValid = validateRequiredString(rg, "rg");
    const nascimentoValid = validateRequiredDate(nascimento, "nascimento");
    const sexoValid = validateRequiredString(sexo, "sexo");
    const prioridadeValid = validateRequiredString(prioridade, "prioridade");
    const profissaoValid = validateOptionalString(profissao, "profissao");
    const tipoCancerValid = validateOptionalString(tipoCancer, "tipoCancer");
    const CIDprincipalValid = validateOptionalString(CIDprincipal, "CIDprincipal");
    const CIDsecundarioValid = validateOptionalString(CIDsecundario, "CIDsecundario");
    const ruaValid = validateOptionalString(rua, "rua");
    const numeroValid = validateOptionalString(numero, "numero");
    const cepValid = validateOptionalString(cep, "cep");
    const bairroValid = validateOptionalString(bairro, "bairro");
    const cidadeValid = validateOptionalString(cidade, "cidade");
    const telefone1Valid = validateOptionalString(telefone1, "telefone1");
    const telefone2Valid = validateOptionalString(telefone2, "telefone2");

    // Se passou por todas regras pode salvar -> pode salvar
    try {
        return await post_Paciente({
            nome: nomeValid,
            status: statusValid,
            cpf: cpfValid,
            rg: rgValid,
            nascimento: nascimentoValid,
            profissao: profissaoValid,
            tipoCancer: tipoCancerValid,
            CIDprincipal: CIDprincipalValid,
            CIDsecundario: CIDsecundarioValid || "",
            rua: ruaValid,
            numero: numeroValid,
            cep: cepValid,
            bairro: bairroValid,
            cidade: cidadeValid,
            telefone1: telefone1Valid,
            telefone2: telefone2Valid || "",
            sexo: sexoValid,
            prioridade: prioridadeValid,
            fotoUrl: fotoUrl || null,
        });
    } catch (err) {
        // Tratamento de erro do Prisma para unique constraint
        if (err && err.code === "P2002") {
            // Identifica qual campo causou o conflito, se possível
            const target = err.meta && err.meta.target ? err.meta.target.join(", ") : "campo único";
            const error = new Error(`Violação de unicidade: ${target} já cadastrado.`);
            error.cause = err;
            throw error;
        }
        // Repassa outros erros
        throw err;
    }
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
 * Valida dados de atualização de paciente.
 */
function validatePacienteUpdateData(data) {
    if (data.nome !== undefined) data.nome = validateRequiredString(data.nome, "nome");
    if (data.status !== undefined) data.status = validateRequiredString(data.status, "status");
    if (data.cpf !== undefined) data.cpf = validateRequiredString(data.cpf, "cpf");
    if (data.rg !== undefined) data.rg = validateRequiredString(data.rg, "rg");
    if (data.nascimento !== undefined)
        data.nascimento = validateRequiredDate(data.nascimento, "nascimento");
    if (data.profissao !== undefined)
        data.profissao = validateOptionalString(data.profissao, "profissao");
    if (data.tipoCancer !== undefined)
        data.tipoCancer = validateOptionalString(data.tipoCancer, "tipoCancer");
    if (data.CIDprincipal !== undefined)
        data.CIDprincipal = validateOptionalString(data.CIDprincipal, "CIDprincipal");
    if (data.CIDsecundario !== undefined)
        data.CIDsecundario = validateOptionalString(data.CIDsecundario, "CIDsecundario");
    if (data.rua !== undefined) data.rua = validateOptionalString(data.rua, "rua");
    if (data.numero !== undefined) data.numero = validateOptionalString(data.numero, "numero");
    if (data.cep !== undefined) data.cep = validateOptionalString(data.cep, "cep");
    if (data.bairro !== undefined) data.bairro = validateOptionalString(data.bairro, "bairro");
    if (data.cidade !== undefined) data.cidade = validateOptionalString(data.cidade, "cidade");
    if (data.telefone1 !== undefined)
        data.telefone1 = validateOptionalString(data.telefone1, "telefone1");
    if (data.telefone2 !== undefined)
        data.telefone2 = validateOptionalString(data.telefone2, "telefone2");
    if (data.sexo !== undefined) data.sexo = validateRequiredString(data.sexo, "sexo");
    if (data.prioridade !== undefined)
        data.prioridade = validateRequiredString(data.prioridade, "prioridade");
    return data;
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
        throw new Error("Paciente não encontrado para atualizar");
    } else {
        console.log("Paciente encontrado para atualização:", existe);
    }
    validatePacienteUpdateData(data);
    const pacienteAtualizado = await updatePaciente(Number(id), data);

    return pacienteAtualizado;
}
