"use client";

import { useState } from "react";
import { FileText, ChevronDown, Users, Lock, Wrench, Package } from "lucide-react";
import RelatorioPacientesPDF from "./RelatorioPacientesPDF";
import RelatorioFuncionariosPDF from "./RelatorioFuncionariosPDF";
import RelatorioEmprestimosPDF from "./RelatorioEmprestimosPDF";
import RelatorioServicosPDF from "./RelatorioServicosPDF";

export default function DropdownRelatorios({
    pacientes = [],
    funcionarios = [],
    emprestimos = [],
    servicos = [],
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-card-border bg-[#F9FBFD] dark:bg-zinc-900 text-foreground text-sm font-medium hover:bg-[#5C7A53]/10 hover:border-[#5C7A53]/40 transition-colors"
            >
                <FileText size={18} />
                Relatórios
                <ChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div
                    className="
                        absolute right-0 mt-3 w-72 z-50
                        rounded-2xl border border-card-border
                        bg-white dark:bg-zinc-950
                        shadow-xl overflow-hidden
                    "
                >
                    <div className="p-4 border-b border-card-border">
                        <h3 className="text-sm font-bold text-foreground">Exportar relatórios</h3>
                        <p className="text-xs text-foreground/50 mt-1">
                            Exportação de dados do sistema
                        </p>
                    </div>

                    <div className="p-2">
                        <RelatorioPacientesPDFButton pacientes={pacientes} />

                        <RelatorioFuncionariosPDFButton funcionarios={funcionarios} />

                        <RelatorioServicosPDFButton servicos={servicos} />

                        <RelatorioEmprestimosPDFButton emprestimos={emprestimos} />
                    </div>
                </div>
            )}
        </div>
    );
}

function RelatorioPacientesPDFButton({ pacientes }) {
    return (
        <div
            className="
                flex items-center gap-3 w-full rounded-xl
                px-3 py-2.5 text-sm
                hover:bg-[#5C7A53]/10 transition-colors
            "
        >
            <Users size={18} className="text-[#5C7A53]" />

            <RelatorioPacientesPDF pacientes={pacientes} />
        </div>
    );
}

function RelatorioFuncionariosPDFButton({ funcionarios }) {
    return (
        <div
            className="
                flex items-center gap-3 w-full rounded-xl
                px-3 py-2.5 text-sm
                hover:bg-[#5C7A53]/10 transition-colors
            "
        >
            <Users size={18} className="text-[#5C7A53]" />

            <RelatorioFuncionariosPDF funcionarios={funcionarios} />
        </div>
    );
}
function RelatorioEmprestimosPDFButton({ emprestimos }) {
    return (
        <div className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm hover:bg-[#5C7A53]/10 transition-colors">
            <Package size={18} className="text-[#5C7A53]" />

            <RelatorioEmprestimosPDF emprestimos={emprestimos} />
        </div>
    );
}

function RelatorioServicosPDFButton({ servicos }) {
    return (
        <div className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm hover:bg-[#5C7A53]/10 transition-colors">
            <Wrench size={18} className="text-[#5C7A53]" />

            <RelatorioServicosPDF servicos={servicos} />
        </div>
    );
}
