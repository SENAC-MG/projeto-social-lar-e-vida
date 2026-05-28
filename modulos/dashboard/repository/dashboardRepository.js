import { prisma } from "@/lib/prisma";

export async function getDashboardChartsRepository() {
  const [
    pacientesPorStatus,
    pacientesPorSexo,
    pacientesPorPrioridade,
    pacientesPorCancer,
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
  ]);

  return {
    pacientes: {
      status: [
        ["Status", "Quantidade"],
        ...pacientesPorStatus.map((item) => [
          item.status,
          item._count.status,
        ]),
      ],

      sexo: [
        ["Sexo", "Quantidade"],
        ...pacientesPorSexo.map((item) => [
          item.sexo,
          item._count.sexo,
        ]),
      ],

      prioridade: [
        ["Prioridade", "Quantidade"],
        ...pacientesPorPrioridade.map((item) => [
          item.prioridade,
          item._count.prioridade,
        ]),
      ],

      cancer: [
        ["Tipo de Câncer", "Quantidade"],
        ...pacientesPorCancer.map((item) => [
          item.tipoCancer,
          item._count.tipoCancer,
        ]),
      ],
    },
  };
}