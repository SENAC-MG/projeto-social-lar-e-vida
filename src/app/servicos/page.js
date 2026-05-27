"use client";

import React, { useState, useEffect } from "react";
import { Plus, Wrench, Search, Menu } from "lucide-react";
import AppShell from "@/shared/layouts/AppShell";
import ModalNovoServico from "../components/modals/ModalNovoServico";
import ModalEditarServico from "../components/update/servicos/ModalEditarServico";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import BotaoDeletarServico from "../components/BotaoDeletarServico";
import BotaoEditarServico from "../components/update/servicos/BotaoEditarServico";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

export default function ServicosPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicoEditando, setServicoEditando] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    async function carregarServicos() {
        try {
            const dados = await get_Servicos();
            setServicos(dados);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        }
    }

    useEffect(() => {
        carregarServicos();
    }, []);

    const servicosFiltrados = servicos.filter((servico) =>
        [servico.nome, servico.cpf, servico.tipoServico, servico.unidade]
            .join(" ")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <main className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
                <div className="p-4 sm:p-8">

                    {/* Header Responsivo */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
                        <div className="flex items-center gap-3 sm:gap-4">

                            {/* ÍCONE DE TRÊS RISCOS: Visível apenas no Mobile */}
                            <button
                                type="button"
                                onClick={toggleSidebar}
                                className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                                aria-label="Abrir menu"
                            >
                                <Menu size={24} />
                            </button>

                            <div className="p-3 bg-[#5C7A53] border border-transparent rounded-xl shadow-sm flex-shrink-0">
                                <Wrench className="text-white" size={24} />
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                                    Serviços
                                </h1>
                                <p className="text-foreground/50 text-xs sm:text-sm">
                                    {servicos.length} registros
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
                        >
                            <Wrench size={20} />
                            Novo Serviço
                        </Button>
                    </div>

                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                                size={18}
                            />
                            <Input
                                type="text"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                placeholder="Pesquisar serviço..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Tabela Responsiva com Scroll Lateral */}
                    <DataTable>
                        <table className="bg-[#F9FBFD] dark:bg-background w-full text-left border-collapse min-w-[800px]">
                            <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                                <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                                    <th className="px-6 py-4 font-semibold">Nome Completo</th>
                                    <th className="px-6 py-4 font-semibold">CPF</th>
                                    <th className="px-6 py-4 font-semibold">Tipo</th>
                                    <th className="px-6 py-4 font-semibold">Duração</th>
                                    <th className="px-6 py-4 font-semibold">Valor</th>
                                    <th className="px-6 py-4 font-semibold">Unidade</th>
                                    <th className="px-6 py-4 font-semibold">Tempo</th>
                                    <th className="px-6 py-4 text-center font-semibold">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {servicosFiltrados.length === 0 ? (
                                    <EmptyTableState colSpan="8">
                                        Nenhum serviço cadastrado
                                    </EmptyTableState>
                                ) : (
                                    servicosFiltrados.map((servico) => (
                                        <tr
                                            key={servico.id}
                                            className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-foreground font-medium text-sm">
                                                {servico.nome}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">{servico.cpf}</td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">{servico.tipoServico}</td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">{servico.duracao}</td>
                                            <td className="px-6 py-4 text-green-500 font-medium text-sm">
                                                R$ {servico.valorServico}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">{servico.unidade}</td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">{servico.tempoServico}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <BotaoEditarServico
                                                        onClick={() => setServicoEditando(servico)}
                                                    />

                                                    <BotaoDeletarServico
                                                        id={servico.id}
                                                        onDeleted={carregarServicos}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </DataTable>
                </div>

                {isModalOpen && (
                    <ModalNovoServico
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={carregarServicos}
                    />
                )}

                {servicoEditando && (
                    <ModalEditarServico
                        servico={servicoEditando}
                        onClose={() => setServicoEditando(null)}
                        onSuccess={carregarServicos}
                    />
                )}
            </main>
        </AppShell>
    );
}
