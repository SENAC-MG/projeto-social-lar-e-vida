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

        const totalPacientes = pacientes.length;
        const pacientesAtivos = pacientes.filter(
          (p) => p.status === "ativo",
        ).length;

        const totalEmprestimos = emprestimos.length;
        const emprestimosAtivos = emprestimos.filter(
          (e) => e.status === "ativo",
        ).length;

        const totalServicos = servicos.length;
        const servicosPendentes = servicos.filter(
          (s) => s.status === "pendente",
        ).length;

        const totalFuncionarios = funcionarios.length;
        const funcionariosAtivos = funcionarios.filter(
          (f) => f.status === "ativo",
        ).length;

        setDados({
          totalPacientes,
          pacientesAtivos,
          totalEmprestimos,
          emprestimosAtivos,
          totalServicos,
          servicosPendentes,
          totalFuncionarios,
          funcionariosAtivos,
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
      titulo: "Total de Pacientes",
      valor: dados.totalPacientes,
      icone: Users,
      cor: "bg-blue-100 dark:bg-blue-900/30",
      textoCor: "text-blue-600 dark:text-blue-400",
      iconeCor: "bg-blue-500",
    },
    {
      titulo: "Pacientes Ativos",
      valor: dados.pacientesAtivos,
      icone: Users,
      cor: "bg-green-100 dark:bg-green-900/30",
      textoCor: "text-green-600 dark:text-green-400",
      iconeCor: "bg-green-500",
    },
    {
      titulo: "Total de Empréstimos",
      valor: dados.totalEmprestimos,
      icone: Package,
      cor: "bg-purple-100 dark:bg-purple-900/30",
      textoCor: "text-purple-600 dark:text-purple-400",
      iconeCor: "bg-purple-500",
    },
    {
      titulo: "Empréstimos Ativos",
      valor: dados.emprestimosAtivos,
      icone: Package,
      cor: "bg-indigo-100 dark:bg-indigo-900/30",
      textoCor: "text-indigo-600 dark:text-indigo-400",
      iconeCor: "bg-indigo-500",
    },
    {
      titulo: "Total de Serviços",
      valor: dados.totalServicos,
      icone: Wrench,
      cor: "bg-orange-100 dark:bg-orange-900/30",
      textoCor: "text-orange-600 dark:text-orange-400",
      iconeCor: "bg-orange-500",
    },
    {
      titulo: "Serviços Pendentes",
      valor: dados.servicosPendentes,
      icone: Wrench,
      cor: "bg-yellow-100 dark:bg-yellow-900/30",
      textoCor: "text-yellow-600 dark:text-yellow-400",
      iconeCor: "bg-yellow-500",
    },
    {
      titulo: "Total de Funcionários",
      valor: dados.totalFuncionarios,
      icone: Hospital,
      cor: "bg-pink-100 dark:bg-pink-900/30",
      textoCor: "text-pink-600 dark:text-pink-400",
      iconeCor: "bg-pink-500",
    },
    {
      titulo: "Funcionários Ativos",
      valor: dados.funcionariosAtivos,
      icone: Hospital,
      cor: "bg-red-100 dark:bg-red-900/30",
      textoCor: "text-red-600 dark:text-red-400",
      iconeCor: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icone;
        return (
          <div
            key={index}
            className={`${card.cor} rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {card.titulo}
                </p>
                <p className={`text-3xl font-bold ${card.textoCor}`}>
                  {loading ? "-" : card.valor}
                </p>
              </div>
              <div className={`${card.iconeCor} p-3 rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
