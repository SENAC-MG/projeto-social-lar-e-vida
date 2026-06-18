"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users, Search, Menu } from "lucide-react";

import Pagination from "../components/shared/ui/Pagination";
import AppShell from "@/shared/layouts/AppShell";
import ModalNovoPaciente from "../components/modals/ModalNovoPaciente";
import ModalEditarPaciente from "../components/update/pacientes/ModalEditarPaciente";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

import { get_Pacientes } from "@modulos/pacientes/controller/pacienteController";

import BotaoDeletarPaciente from "../components/BotaoDeletarPaciente";
import BotaoEditarPaciente from "../components/update/pacientes/BotaoEditarPaciente";

export default function PacientesPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pacienteEditando, setPacienteEditando] = useState(null);

    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const ITENS_POR_PAGINA = 15;

    const totalPaginas = Math.ceil(pacientes.length / ITENS_POR_PAGINA);

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;

    const pacientesPaginados = pacientes.slice(inicio, fim);

    const carregarPacientes = async () => {
        setLoading(true);

        try {
            const dados = await get_Pacientes();
            setPacientes(dados);
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarPacientes();
    }, []);

    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <main className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
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
                                <Users className="text-white" size={24} />
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                                    Pacientes
                                </h1>

                                <p className="text-foreground/50 text-xs sm:text-sm">
                                    {pacientes.length} registros
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
                        >
                            <UserPlus size={20} />
                            Novo Paciente
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
                                    placeholder="Pesquisar paciente..."
                                    className="pl-10 bg-transparent"
                                />
                            </div>
                        </div>

                        <DataTable>
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                                    <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                                        <th className="px-6 py-4 font-semibold">Foto</th>
                                        <th className="px-6 py-4 font-semibold">Nome</th>
                                        <th className="px-6 py-4 font-semibold">CPF</th>
                                        <th className="px-6 py-4 font-semibold">Sexo</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Prioridade</th>
                                        <th className="px-6 py-4 font-semibold">Telefone</th>
                                        <th className="px-6 py-4 text-center font-semibold">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <EmptyTableState colSpan="8">Carregando...</EmptyTableState>
                                    ) : pacientes.length === 0 ? (
                                        <EmptyTableState colSpan="8">
                                            Nenhum paciente cadastrado
                                        </EmptyTableState>
                                    ) : (
                                        pacientesPaginados.map((paciente) => (
                                            <tr
                                                key={paciente.id}
                                                className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    {paciente.fotoUrl ? (
                                                        <img
                                                            src={paciente.fotoUrl}
                                                            alt={`Foto de ${paciente.nome}`}
                                                            className="w-12 h-12 rounded-full object-cover border border-card-border"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-[#5C7A53]/20 border border-card-border flex items-center justify-center text-[#5C7A53] font-bold text-sm">
                                                            {paciente.nome?.charAt(0)?.toUpperCase() ||
                                                                "P"}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-foreground font-medium text-sm">
                                                    {paciente.nome}
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {paciente.cpf}
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {paciente.sexo || "-"}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${paciente.status === "ativo"
                                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                                            : paciente.status ===
                                                                "em tratamento"
                                                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                                : paciente.status === "alta"
                                                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                                                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                    >
                                                        {paciente.status || "-"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${paciente.prioridade === "urgente"
                                                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                                            : paciente.prioridade === "alta"
                                                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                                                : paciente.prioridade === "media"
                                                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                                                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                    >
                                                        {paciente.prioridade || "-"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-foreground/60 text-sm">
                                                    {paciente.telefone1 || "-"}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <BotaoEditarPaciente
                                                            onClick={() =>
                                                                setPacienteEditando(paciente)
                                                            }
                                                        />

                                                        <BotaoDeletarPaciente
                                                            id={paciente.id}
                                                            onDeleted={carregarPacientes}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </DataTable>

                        {pacientes.length > 0 && (
                            <Pagination
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                onPageChange={setPaginaAtual}
                            />
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <ModalNovoPaciente
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={carregarPacientes}
                    />
                )}

                {pacienteEditando && (
                    <ModalEditarPaciente
                        paciente={pacienteEditando}
                        onClose={() => setPacienteEditando(null)}
                        onSuccess={carregarPacientes}
                    />
                )}
            </main>
        </AppShell>
    );
}