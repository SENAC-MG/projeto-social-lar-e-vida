import { prisma } from "@/lib/prisma";

export async function getDashboardChartsRepository() {
    const [
        pacientesPorStatus,
        pacientesPorSexo,
        pacientesPorPrioridade,
        pacientesPorCancer,

        emprestimosPorStatus,
        emprestimosPorCidade,
        emprestimosQuantidadePorStatus,
        emprestimosPorMes,

        servicosPorStatus,
        servicosPorTipo,
        servicosPorFuncionario,
        servicosValorPorTipo,

        funcionariosPorStatus,
        funcionariosPorCargo,
        funcionariosPorDataContratacao,
    ] = await Promise.all([
        prisma.Pacientes.groupBy({
            by: ["status"],
            _count: { status: true },
        }),

        prisma.Pacientes.groupBy({
            by: ["sexo"],
            _count: { sexo: true },
        }),

        prisma.Pacientes.groupBy({
            by: ["prioridade"],
            _count: { prioridade: true },
        }),

        prisma.Pacientes.groupBy({
            by: ["tipoCancer"],
            _count: { tipoCancer: true },
            orderBy: {
                _count: {
                    tipoCancer: "desc",
                },
            },
            take: 10,
        }),

        prisma.Emprestimo.groupBy({
            by: ["status"],
            _count: { status: true },
        }),

        prisma.Emprestimo.groupBy({
            by: ["cidade"],
            _count: { cidade: true },
            orderBy: {
                _count: {
                    cidade: "desc",
                },
            },
            take: 10,
        }),

        prisma.Emprestimo.groupBy({
            by: ["status"],
            _sum: {
                quantidade: true,
            },
        }),

        prisma.Emprestimo.findMany({
            select: {
                dataEmprestimo: true,
            },
        }),

        prisma.Servicos.groupBy({
            by: ["status"],
            _count: { status: true },
        }),

        prisma.Servicos.groupBy({
            by: ["tipoServico"],
            _count: { tipoServico: true },
            orderBy: {
                _count: {
                    tipoServico: "desc",
                },
            },
            take: 10,
        }),

        prisma.Servicos.groupBy({
            by: ["funcionarioResponsavel"],
            _count: {
                funcionarioResponsavel: true,
            },
            orderBy: {
                _count: {
                    funcionarioResponsavel: "desc",
                },
            },
            take: 10,
        }),

        prisma.Servicos.groupBy({
            by: ["tipoServico"],
            _sum: {
                valorServico: true,
            },
            orderBy: {
                _sum: {
                    valorServico: "desc",
                },
            },
            take: 10,
        }),

        prisma.Funcionarios.groupBy({
            by: ["status"],
            _count: { status: true },
        }),

        prisma.Funcionarios.groupBy({
            by: ["cargo"],
            _count: { cargo: true },
            orderBy: {
                _count: {
                    cargo: "desc",
                },
            },
            take: 10,
        }),

        prisma.Funcionarios.findMany({
            select: {
                dataContratacao: true,
            },
        }),
    ]);

    const mesesEmprestimos = {};
    emprestimosPorMes.forEach((item) => {
        const mes = new Date(item.dataEmprestimo).toLocaleString("pt-BR", {
            month: "short",
        });

        mesesEmprestimos[mes] = (mesesEmprestimos[mes] || 0) + 1;
    });

    const contratacoesMes = {};
    const contratacoesAno = {};

    funcionariosPorDataContratacao.forEach((item) => {
        const data = new Date(item.dataContratacao);

        const mes = data.toLocaleString("pt-BR", {
            month: "short",
        });

        const ano = data.getFullYear().toString();

        contratacoesMes[mes] = (contratacoesMes[mes] || 0) + 1;
        contratacoesAno[ano] = (contratacoesAno[ano] || 0) + 1;
    });

    return {
        pacientes: {
            status: [
                ["Status", "Quantidade"],
                ...pacientesPorStatus.map((item) => [item.status, item._count.status]),
            ],

            sexo: [
                ["Sexo", "Quantidade"],
                ...pacientesPorSexo.map((item) => [item.sexo, item._count.sexo]),
            ],

            prioridade: [
                ["Prioridade", "Quantidade"],
                ...pacientesPorPrioridade.map((item) => [item.prioridade, item._count.prioridade]),
            ],

            cancer: [
                ["Tipo de Câncer", "Quantidade"],
                ...pacientesPorCancer.map((item) => [item.tipoCancer, item._count.tipoCancer]),
            ],
        },

        emprestimos: {
            status: [
                ["Status", "Quantidade"],
                ...emprestimosPorStatus.map((item) => [item.status, item._count.status]),
            ],

            cidade: [
                ["Cidade", "Quantidade"],
                ...emprestimosPorCidade.map((item) => [item.cidade, item._count.cidade]),
            ],

            quantidade: [
                ["Status", "Quantidade emprestada"],
                ...emprestimosQuantidadePorStatus.map((item) => [
                    item.status,
                    item._sum.quantidade || 0,
                ]),
            ],

            mensal: [["Mês", "Empréstimos"], ...Object.entries(mesesEmprestimos)],
        },

        servicos: {
            status: [
                ["Status", "Quantidade"],
                ...servicosPorStatus.map((item) => [item.status, item._count.status]),
            ],

            tipo: [
                ["Tipo Serviço", "Quantidade"],
                ...servicosPorTipo.map((item) => [item.tipoServico, item._count.tipoServico]),
            ],

            responsavel: [
                ["Funcionário", "Quantidade"],
                ...servicosPorFuncionario.map((item) => [
                    item.funcionarioResponsavel || "Sem responsável",
                    item._count.funcionarioResponsavel,
                ]),
            ],

            valorPorTipo: [
                ["Tipo Serviço", "Valor total"],
                ...servicosValorPorTipo.map((item) => [
                    item.tipoServico,
                    item._sum.valorServico || 0,
                ]),
            ],
        },

        funcionarios: {
            status: [
                ["Status", "Quantidade"],
                ...funcionariosPorStatus.map((item) => [item.status, item._count.status]),
            ],

            cargo: [
                ["Cargo", "Quantidade"],
                ...funcionariosPorCargo.map((item) => [item.cargo, item._count.cargo]),
            ],

            contratacoesMes: [["Mês", "Contratações"], ...Object.entries(contratacoesMes)],

            contratacoesAno: [["Ano", "Contratações"], ...Object.entries(contratacoesAno)],
        },
    };
}
