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
 * Criar novo empréstimo
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
                quantidadeAtual: {
                    decrement: quantidade,
                },
            },
        });

        return emprestimo;
    });
}

/**
 * Deletar empréstimo
 */
export async function del_Emprestimo(id) {
    return await prisma.$transaction(async (tx) => {
        const emprestimo = await tx.Emprestimo.findUnique({
            where: { id: Number(id) },
        });

        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }

        const consomeEstoque =
            emprestimo.status === "ativo" ||
            emprestimo.status === "atrasado";

        if (consomeEstoque && emprestimo.materialId) {
            await tx.materiais.update({
                where: {
                    id: Number(emprestimo.materialId),
                },
                data: {
                    quantidadeAtual: {
                        increment: emprestimo.quantidade,
                    },
                },
            });
        }

        return await tx.Emprestimo.delete({
            where: {
                id: Number(id),
            },
        });
    });
}

/**
 * Buscar empréstimo por ID
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
 * Atualizar empréstimo
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

        const statusAnterior = emprestimoAtual.status;
        const novoStatus = data.status ?? statusAnterior;

        const estavaConsumindoEstoque =
            statusAnterior === "ativo" ||
            statusAnterior === "atrasado";

        const vaiConsumirEstoque =
            novoStatus === "ativo" ||
            novoStatus === "atrasado";

        if (materialId) {
            const material = await tx.materiais.findUnique({
                where: { id: Number(materialId) },
            });

            if (!material) {
                throw new Error(
                    "Material vinculado ao empréstimo não encontrado."
                );
            }

            // Continua consumindo estoque (ativo -> ativo)
            if (estavaConsumindoEstoque && vaiConsumirEstoque) {
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

            // Ativo/Atrasado -> Devolvido/Cancelado
            if (estavaConsumindoEstoque && !vaiConsumirEstoque) {
                await tx.materiais.update({
                    where: { id: Number(materialId) },
                    data: {
                        quantidadeAtual: {
                            increment: quantidadeAntiga,
                        },
                    },
                });
            }

            // Devolvido/Cancelado -> Ativo/Atrasado
            if (!estavaConsumindoEstoque && vaiConsumirEstoque) {
                if (material.quantidadeAtual < quantidadeNova) {
                    throw new Error(
                        `Estoque insuficiente. Disponível: ${material.quantidadeAtual}. Necessário: ${quantidadeNova}.`
                    );
                }

                await tx.materiais.update({
                    where: { id: Number(materialId) },
                    data: {
                        quantidadeAtual: {
                            decrement: quantidadeNova,
                        },
                    },
                });
            }
        }

        console.log(
            "Atualizando Empréstimo ID:",
            id,
            "com dados",
            sanitizeForLog(data)
        );

        const emprestimoAtualizado = await tx.Emprestimo.update({
            where: { id: Number(id) },
            data,
        });

        console.log(
            "Empréstimo atualizado com sucesso:",
            emprestimoAtualizado
        );

        return emprestimoAtualizado;
    });
}