"use client";

import { useEffect, useState } from "react";
import { UserPlus, Hospital, Search, Menu } from "lucide-react";

import Pagination from "../components/shared/ui/Pagination";
import AppShell from "@/shared/layouts/AppShell";
import ModalNovoFuncionario from "../components/modals/ModalNovoFuncionario";
import ModalEditarFuncionario from "../components/update/funcionarios/ModalEditarFuncionario";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";

import BotaoDeletar from "../components/BotaoDeletar";
import BotaoEditarFuncionario from "../components/update/funcionarios/BotaoEditarFuncionario";

export default function FuncionariosPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funcionarioEditando, setFuncionarioEditando] = useState(null);

    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);

    const ITENS_POR_PAGINA = 15;

    const totalPaginas = Math.ceil(funcionarios.length / ITENS_POR_PAGINA);

    useEffect(() => {
        setPaginaAtual((current) => Math.min(current, Math.max(1, totalPaginas)));
    }, [totalPaginas]);

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;

    const funcionariosPaginados = funcionarios.slice(inicio, fim);

    const carregarFuncionarios = async () => {
        setLoading(true);

        try {
            const dados = await get_Funcionarios();
            setFuncionarios(dados);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <main className="flex-1 flex flex-col bg-[#EEF2F7] dark:bg-background min-w-0 transition-all duration-300">
                <div className="p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={toggleSidebar}
                                className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                                aria-label="Abrir menu"
                            >
                                <Menu size={24} />
                            </button>

                            <div className="p-3 bg-[#5C7A53] border border-transparent rounded-xl shadow-sm flex-shrink-0">
                                <Hospital className="text-white" size={24} />
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                                    Funcionários
                                </h1>

                                <p className="text-foreground/50 text-xs sm:text-sm">
                                    {funcionarios.length} registros
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
                        >
                            <UserPlus size={20} />
                            Novo Funcionário
                        </Button>
                    </div>

                    <div className="rounded-2xl border border-card-border bg-[#F9FBFD] dark:bg-background overflow-hidden">
                        <div className="p-4 border-b border-card-border">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                                    size={18}
                                />

                                <Input
                                    type="text"
                                    placeholder="Pesquisar funcionários..."
                                    className="pl-10 bg-transparent"
                                />
                            </div>
                        </div>

                        <DataTable>
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                                    <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                                        <th className="px-6 py-4 font-semibold">Nome</th>
                                        <th className="px-6 py-4 font-semibold">Email</th>
                                        <th className="px-6 py-4 font-semibold">Cargo</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">
                                            Data Contratação
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <EmptyTableState colSpan="6">Carregando...</EmptyTableState>
                                    ) : funcionarios.length === 0 ? (
                                        <EmptyTableState colSpan="6">
                                            Nenhum funcionário cadastrado
                                        </EmptyTableState>
                                    ) : (
                                        funcionariosPaginados.map((funcionario) => (
                                            <tr
                                                key={funcionario.id}
                                                className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-foreground font-medium text-sm">
                                                    {funcionario.nome}
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {funcionario.email}
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {funcionario.cargo}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            funcionario.status === "ativo"
                                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                                                : funcionario.status === "inativo"
                                                                  ? "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                                                                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                                        }`}
                                                    >
                                                        {funcionario.status || "ativo"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {funcionario.dataContratacao
                                                        ? new Date(
                                                              funcionario.dataContratacao
                                                          ).toLocaleDateString("pt-BR")
                                                        : "-"}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <BotaoEditarFuncionario
                                                            onClick={() =>
                                                                setFuncionarioEditando(funcionario)
                                                            }
                                                        />

                                                        <BotaoDeletar
                                                            id={funcionario.id}
                                                            onDeleted={carregarFuncionarios}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </DataTable>

                        {funcionarios.length > 0 && (
                            <Pagination
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                onPageChange={setPaginaAtual}
                            />
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <ModalNovoFuncionario
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={carregarFuncionarios}
                    />
                )}

                {funcionarioEditando && (
                    <ModalEditarFuncionario
                        funcionario={funcionarioEditando}
                        onClose={() => setFuncionarioEditando(null)}
                        onSuccess={carregarFuncionarios}
                    />
                )}
            </main>
        </AppShell>
    );
}
