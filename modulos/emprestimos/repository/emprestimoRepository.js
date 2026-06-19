import { prisma } from "../../../lib/prisma";

function sanitizeForLog(value) {
    try {
        const serialized =
            typeof value === "string" ? value : JSON.stringify(value);
        return serialized.replace(/[\r\n]/g, "");
    } catch {
        return String(value).replace(/[\r\n]/g, "");
    }
}
/**
 * Buscar todos os empréstimos
 *
 * - Retorna uma lista com todos os empréstimos do banco
 * - Ordena do mais recente para o mais antigo (criadoEm DESC)
 * - Usado normalmente para listagem em tabelas
 */
export async function get_AllEmprestimos() {
    return await prisma.Emprestimo.findMany({
        orderBy: {
            nome: "asc",
        },
        include: {
            material: true,
        },
    });
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
        materialId,
    } = data;

    return await prisma.$transaction(async (tx) => {
        const material = await tx.materiais.findUnique({
            where: { id: Number(materialId) },
        });

        if (!material) {
            throw new Error("Material não encontrado.");
        }

        if (material.quantidadeAtual < quantidade) {
            throw new Error("Quantidade insuficiente em estoque.");
        }

        const emprestimo = await tx.Emprestimo.create({
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
                materialId: Number(materialId),
            },
        });

        await tx.materiais.update({
            where: { id: Number(materialId) },
            data: {
                quantidadeAtual: material.quantidadeAtual - quantidade,
            },
        });

        return emprestimo;
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
    return await prisma.Emprestimo.findUnique({
        where: { id: Number(id) },
        include: {
            material: true,
        },
    });
}

/**
 * - Recebe o ID do empréstimo e os novos dados
 * - Atualiza apenas os campos enviados
 * - Retorna o empréstimo atualizado
 */
export async function updateEmprestimo(id, data) {
    return await prisma.$transaction(async (tx) => {
        const emprestimoAtual = await tx.Emprestimo.findUnique({
            where: { id: Number(id) },
        });

        if (!emprestimoAtual) {
            throw new Error("Empréstimo não encontrado.");
        }

        const quantidadeAntiga = Number(emprestimoAtual.quantidade);
        const quantidadeNova =
            data.quantidade !== undefined
                ? Number(data.quantidade)
                : quantidadeAntiga;

        if (Number.isNaN(quantidadeNova) || quantidadeNova < 1) {
            throw new Error("Quantidade inválida.");
        }

        const materialId = emprestimoAtual.materialId;

        if (materialId && data.status !== "devolvido") {
            const material = await tx.materiais.findUnique({
                where: { id: Number(materialId) },
            });

            if (!material) {
                throw new Error("Material vinculado ao empréstimo não encontrado.");
            }

            const diferenca = quantidadeNova - quantidadeAntiga;

            if (diferenca > 0) {
                if (material.quantidadeAtual < diferenca) {
                    throw new Error(
                        `Estoque insuficiente. Disponível: ${material.quantidadeAtual}. Necessário adicional: ${diferenca}.`
                    );
                }

                await tx.materiais.update({
                    where: { id: Number(materialId) },
                    data: {
                        quantidadeAtual: {
                            decrement: diferenca,
                        },
                    },
                });
            }

            if (diferenca < 0) {
                await tx.materiais.update({
                    where: { id: Number(materialId) },
                    data: {
                        quantidadeAtual: {
                            increment: Math.abs(diferenca),
                        },
                    },
                });
            }
        }

        const statusAnterior = emprestimoAtual.status;
        const novoStatus = data.status;

        const deveReporEstoque =
            statusAnterior !== "devolvido" &&
            novoStatus === "devolvido" &&
            materialId;

        const emprestimoAtualizado = await tx.Emprestimo.update({
            where: { id: Number(id) },
            data,
        });

        if (deveReporEstoque) {
            await tx.materiais.update({
                where: { id: Number(materialId) },
                data: {
                    quantidadeAtual: {
                        increment: quantidadeAntiga,
                    },
                },
            });
        }

        return emprestimoAtualizado;
    });
}