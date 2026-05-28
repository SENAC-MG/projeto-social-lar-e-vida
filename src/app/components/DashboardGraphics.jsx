"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { get_Pacientes } from "@modulos/pacientes/controller/pacienteController";
import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";

export default function DashboardGraphics() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dadosGraficos, setDadosGraficos] = useState({
    pacientesStatus: {},
    emprestimosStatus: {},
    servicosStatus: {},
    funcionariosStatus: {},
  });

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

        // Processar status dos pacientes
        const pacientesStatus = pacientes.reduce((acc, p) => {
          const status = p.status || "ativo";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Processar status dos empréstimos
        const emprestimosStatus = emprestimos.reduce((acc, e) => {
          const status = e.status || "ativo";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Processar status dos serviços
        const servicosStatus = servicos.reduce((acc, s) => {
          const status = s.status || "pendente";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Processar status dos funcionários
        const funcionariosStatus = funcionarios.reduce((acc, f) => {
          const status = f.status || "ativo";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        setDadosGraficos({
          pacientesStatus,
          emprestimosStatus,
          servicosStatus,
          funcionariosStatus,
        });
      } catch (error) {
        console.error("Erro ao carregar dados dos gráficos:", error);
      }
    }

    carregarDados();
  }, []);

  const renderStatusBar = (dados, labels, colors) => {
    const total = Object.values(dados).reduce((a, b) => a + b, 0);
    return (
      <div className="space-y-2">
        {labels.map((label, index) => {
          const count = dados[label] || 0;
          const percentage = total === 0 ? 0 : (count / total) * 100;
          return (
            <div key={label}>
              <div className="flex justify-between mb-1 text-xs font-medium">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {label}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  {count}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${colors[index]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Gráficos de Status
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform ${
            !isExpanded ? "rotate-180" : ""
          }`}
          aria-label="Alternar gráficos"
        >
          <ChevronUp size={24} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Gráfico Pacientes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Pacientes
            </h3>
            {renderStatusBar(
              dadosGraficos.pacientesStatus,
              ["ativo", "em tratamento", "alta", "inativo"],
              ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-gray-500"],
            )}
          </div>

          {/* Gráfico Empréstimos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Empréstimos
            </h3>
            {renderStatusBar(
              dadosGraficos.emprestimosStatus,
              ["ativo", "devolvido", "atrasado", "cancelado"],
              ["bg-green-500", "bg-blue-500", "bg-red-500", "bg-gray-500"],
            )}
          </div>

          {/* Gráfico Serviços */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Serviços
            </h3>
            {renderStatusBar(
              dadosGraficos.servicosStatus,
              ["pendente", "em andamento", "concluido", "cancelado"],
              ["bg-yellow-500", "bg-blue-500", "bg-green-500", "bg-gray-500"],
            )}
          </div>

          {/* Gráfico Funcionários */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Funcionários
            </h3>
            {renderStatusBar(
              dadosGraficos.funcionariosStatus,
              ["ativo", "inativo", "afastado"],
              ["bg-green-500", "bg-gray-500", "bg-orange-500"],
            )}
          </div>
        </div>
      )}
    </div>
  );
}
