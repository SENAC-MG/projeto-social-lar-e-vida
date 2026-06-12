import { prisma } from "../../../lib/prisma";
/**
 * Buscar todos os empréstimos
 *
 * - Retorna uma lista com todos os empréstimos do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllEmprestimos() {
    const result = await prisma.Emprestimo.findMany({
        orderBy: {
            nome: "asc",
        },
    });
    return result;
}
/**
 * - Criar novo Empréstimo
 *
 * - Recebe um objeto com os dados do empréstimo
 * - Ex: { nome, cpf, rg}
 * - Retorna o Empréstimo criado
 */
export async function post_Emprestimo(data) {
    const {
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
    } = data;
    return await prisma.Emprestimo.create({
        data: {
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
        },
    });
}
/**
 * Deletar Empréstimo
 *
 * - Remove o Empréstimo do banco pelo ID
 * - Cuidado: Operação irreversível
 */
export async function del_Emprestimo(id) {
    const result = await prisma.Emprestimo.delete({
        where: { id },
    });
    return result;
}

/**
 * Buscar Empréstimo pelo ID
 *
 * - Busca um único Empréstimo pelo ID ( chave primária )
 * - Retorna null se não encontrar
 * - Usado em edição, detalhes, etc
 */
export async function findEmprestimoById(id) {
    const emprestimo = await prisma.Emprestimo.findUnique({
        where: { id },
    });
    // Retorna o empréstimo encontrado ou null se não existir
    return emprestimo;
}

/**
 * - Recebe o ID do empréstimo e os novos dados
 * - Atualiza apenas os campos enviados
 * - Retorna o empréstimo atualizado
 */
export async function updateEmprestimo(id, data) {
    console.log("Atualizando Empréstimo ID:", id, "com dados", data);

    const Emprestimo_atualizado = await prisma.Emprestimo.update({
        where: { id },
        data,
    });

    console.log("Empréstimo atualizado com sucesso:", Emprestimo_atualizado);
    return Emprestimo_atualizado;
}
