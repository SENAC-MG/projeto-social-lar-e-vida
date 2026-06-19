"use client";

import { Users, Package, Wrench, Hospital, Boxes, AlertTriangle } from "lucide-react";

export default function DashboardCards({ dados, materiais = [] }) {
    const loading = !dados;

    const totalMateriais = materiais.length;

    const materiaisDisponiveis = materiais.filter(
        (material) => Number(material.quantidadeAtual) > 0
    ).length;

    const materiaisEmprestados = materiais.filter(
        (material) => Number(material.quantidadeTotal) - Number(material.quantidadeAtual) > 0
    ).length;

    const estoqueBaixo = materiais.filter(
        (material) =>
            Number(material.quantidadeTotal) > 0 &&
            Number(material.quantidadeAtual) <= Number(material.quantidadeTotal) * 0.3
    ).length;

    const cards = [
        {
            titulo: "Pacientes",
            valor: dados?.totalPacientes ?? 0,
            descricao: "Cadastrados",
            icone: Users,
            corBorda: "#5C7A53",
        },
        {
            titulo: "Pacientes Ativos",
            valor: dados?.pacientesAtivos ?? 0,
            descricao: "Em atendimento",
            icone: Users,
            corBorda: "#3D5A80",
        },
        {
            titulo: "Empréstimos",
            valor: dados?.totalEmprestimos ?? 0,
            descricao: "Registrados",
            icone: Package,
            corBorda: "#D88C42",
        },
        {
            titulo: "Empréstimos Ativos",
            valor: dados?.emprestimosAtivos ?? 0,
            descricao: "Em aberto",
            icone: Package,
            corBorda: "#A6477B",
        },
        {
            titulo: "Serviços",
            valor: dados?.totalServicos ?? 0,
            descricao: "Cadastrados",
            icone: Wrench,
            corBorda: "#5C7A53",
        },
        {
            titulo: "Serviços Pendentes",
            valor: dados?.servicosPendentes ?? 0,
            descricao: "Aguardando",
            icone: Wrench,
            corBorda: "#3D5A80",
        },
        {
            titulo: "Funcionários",
            valor: dados?.totalFuncionarios ?? 0,
            descricao: "Cadastrados",
            icone: Hospital,
            corBorda: "#D88C42",
        },
        {
            titulo: "Funcionários Ativos",
            valor: dados?.funcionariosAtivos ?? 0,
            descricao: "Ativos",
            icone: Hospital,
            corBorda: "#A6477B",
        },
        {
            titulo: "Materiais",
            valor: totalMateriais,
            descricao: "Cadastrados",
            icone: Boxes,
            corBorda: "#5C7A53",
        },
        {
            titulo: "Disponíveis",
            valor: materiaisDisponiveis,
            descricao: "Com estoque",
            icone: Boxes,
            corBorda: "#3D5A80",
        },
        {
            titulo: "Emprestados",
            valor: materiaisEmprestados,
            descricao: "Em uso",
            icone: Package,
            corBorda: "#D88C42",
        },
        {
            titulo: "Estoque Baixo",
            valor: estoqueBaixo,
            descricao: "Abaixo de 30%",
            icone: AlertTriangle,
            corBorda: "#A6477B",
        },
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {cards.map((card, index) => {
                const Icon = card.icone;

                return (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-[#313131] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div
                            className="absolute left-0 top-0 h-full w-1"
                            style={{ backgroundColor: card.corBorda }}
                        />

                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[#A1A1AA]">
                                    {card.titulo}
                                </p>

                                <h3 className="mt-2 text-4xl font-bold leading-none text-gray-900 dark:text-[#F5F5F5]">
                                    {loading ? "-" : card.valor}
                                </h3>

                                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-[#A1A1AA]">
                                    {card.descricao}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-100 dark:bg-[#272A25] text-[#5C7A53] dark:text-[#92AF77]">
                                <Icon size={22} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
