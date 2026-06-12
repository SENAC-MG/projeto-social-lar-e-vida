import { prisma } from "../../../lib/prisma";
/**
 * Buscar todos os serviços
 *
 * - Retorna uma lista com todos os serviços do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllServicos() {
    const result = await prisma.Servicos.findMany({
        orderBy: {
            nome: "asc",
        },
    });
    return result;
}
/**
 * - Criar novo Serviço
 *
 * - Recebe um objeto com os dados do serviço
 * - Ex: { nome, email, cargo }
 * - Retorna o serviço criado
 */
export async function post_Servico(data) {
    const {
        nome,
        cpf,
        tipoServico,
        duracao,
        valorServico,
        unidade,
        tempoServico,
        status,
        dataServico,
        funcionarioResponsavel,
    } = data;
    return await prisma.Servicos.create({
        data: {
            nome,
            cpf,
            tipoServico,
            duracao,
            valorServico,
            unidade,
            tempoServico,
            status,
            dataServico,
            funcionarioResponsavel,
        },
    });
}
/**
 * Deletar serviço
 *
 * - Remove o serviço do banco pelo ID
 * - Cuidado: Operação irreversível
 */
export async function del_Servico(id) {
    const result = await prisma.Servicos.delete({
        where: { id },
    });
    return result;
}

/**
 * Buscar serviço pelo ID
 *
 * - Busca um único serviço pelo ID ( chave primária )
 * - Retorna null se não encontrar
 * - Usado em edição, detalhes, etc
 */
export async function findServicoById(id) {
    const servico = await prisma.Servicos.findUnique({
        where: { id },
    });
    // Retorna o serviço encontrado ou null se não existir
    return servico;
}

/**
 * - Recebe o ID do serviço e os novos dados
 * - Atualiza apenas os campos enviados
 * - Retorna o serviço atualizado
 */
export async function updateServico(id, data) {
    console.log("Atualizando serviço ID:", id, "com dados", data);

    const Servico_atualizado = await prisma.Servicos.update({
        where: { id },
        data,
    });

    console.log("Serviço atualizado com sucesso:", Servico_atualizado);
    return Servico_atualizado;
}
