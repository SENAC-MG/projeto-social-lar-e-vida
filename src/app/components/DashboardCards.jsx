"use client";

import React, { useState, useEffect } from "react";
import { Users, Package, Wrench, Hospital } from "lucide-react";
import { get_Pacientes } from "@modulos/pacientes/controller/pacienteController";
import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";

export default function DashboardCards() {
  const [dados, setDados] = useState({
    totalPacientes: 0,
    pacientesAtivos: 0,
    totalEmprestimos: 0,
    emprestimosAtivos: 0,
    totalServicos: 0,
    servicosPendentes: 0,
    totalFuncionarios: 0,
    funcionariosAtivos: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pacientes, emprestimos, servicos, funcionarios] =
          await Promise.all([
            get_Pacientes(),
            get_Emprestimos(),
            get_Servicos(),
            get_Funcionarios(),
          ]);

        setDados({
          totalPacientes: pacientes.length,
          pacientesAtivos: pacientes.filter((p) => p.status === "ativo").length,
          totalEmprestimos: emprestimos.length,
          emprestimosAtivos: emprestimos.filter((e) => e.status === "ativo")
            .length,
          totalServicos: servicos.length,
          servicosPendentes: servicos.filter((s) => s.status === "pendente")
            .length,
          totalFuncionarios: funcionarios.length,
          funcionariosAtivos: funcionarios.filter((f) => f.status === "ativo")
            .length,
        });
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const cards = [
    {
      titulo: "Pacientes",
      valor: dados.totalPacientes,
      descricao: "Cadastrados",
      icone: Users,
      corBorda: "#5C7A53",
    },
    {
      titulo: "Pacientes Ativos",
      valor: dados.pacientesAtivos,
      descricao: "Em atendimento",
      icone: Users,
      corBorda: "#3D5A80",
    },
    {
      titulo: "Empréstimos",
      valor: dados.totalEmprestimos,
      descricao: "Registrados",
      icone: Package,
      corBorda: "#D88C42",
    },
    {
      titulo: "Empréstimos Ativos",
      valor: dados.emprestimosAtivos,
      descricao: "Em aberto",
      icone: Package,
      corBorda: "#A6477B",
    },
    {
      titulo: "Serviços",
      valor: dados.totalServicos,
      descricao: "Cadastrados",
      icone: Wrench,
      corBorda: "#5C7A53",
    },
    {
      titulo: "Serviços Pendentes",
      valor: dados.servicosPendentes,
      descricao: "Aguardando",
      icone: Wrench,
      corBorda: "#3D5A80",
    },
    {
      titulo: "Funcionários",
      valor: dados.totalFuncionarios,
      descricao: "Cadastrados",
      icone: Hospital,
      corBorda: "#D88C42",
    },
    {
      titulo: "Funcionários Ativos",
      valor: dados.funcionariosAtivos,
      descricao: "Ativos",
      icone: Hospital,
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
