"use client";

import { useState } from "react";
import {
    BookOpen,
    Menu,
    Users,
    Hospital,
    Package,
    Wrench,
    LayoutGrid,
    ChevronDown,
    ChevronRight,
    FileText,
    UserPlus,
    Search,
    Edit,
    Trash2,
    ArrowRight,
    ClipboardList,
    AlertCircle,
    CheckCircle,
    Info,
    Lightbulb,
    Monitor,
    MousePointerClick,
    ListChecks,
    Shield,
    Database,
    Layers,
    Settings,
    HelpCircle,
    ChartBar,
} from "lucide-react";
import AppShell from "@/shared/layouts/AppShell";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Image from "next/image";

function CollapsibleSection({ title, icon: Icon, defaultOpen = false, children }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border border-card-border rounded-xl overflow-hidden bg-[#F9FBFD] dark:bg-zinc-900/50">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-foreground/5 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="p-2 bg-[#5C7A53]/10 rounded-lg">
                            <Icon size={20} className="text-[#5C7A53]" />
                        </div>
                    )}
                    <h2 className="text-lg font-bold text-foreground">{title}</h2>
                </div>
                {open ? (
                    <ChevronDown size={20} className="text-foreground/40 flex-shrink-0" />
                ) : (
                    <ChevronRight size={20} className="text-foreground/40 flex-shrink-0" />
                )}
            </button>

            {open && <div className="px-4 sm:px-5 pb-5 border-t border-card-border pt-4">{children}</div>}
        </div>
    );
}

// ─── Componente de passo numerado ────────────────────────────────────────────
function Step({ number, title, children }) {
    return (
        <div className="flex gap-4 mb-6 last:mb-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5C7A53] text-white flex items-center justify-center text-sm font-bold mt-0.5">
                {number}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                <div className="text-foreground/70 text-sm leading-relaxed space-y-2">{children}</div>
            </div>
        </div>
    );
}

// ─── Componente de dica / informação ─────────────────────────────────────────
function TipBox({ type = "info", title, children }) {
    const styles = {
        info: {
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
            icon: Info,
            iconColor: "text-blue-600 dark:text-blue-400",
            titleColor: "text-blue-800 dark:text-blue-300",
            textColor: "text-blue-700 dark:text-blue-200",
        },
        tip: {
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-200 dark:border-green-800",
            icon: Lightbulb,
            iconColor: "text-green-600 dark:text-green-400",
            titleColor: "text-green-800 dark:text-green-300",
            textColor: "text-green-700 dark:text-green-200",
        },
        warning: {
            bg: "bg-amber-50 dark:bg-amber-900/20",
            border: "border-amber-200 dark:border-amber-800",
            icon: AlertCircle,
            iconColor: "text-amber-600 dark:text-amber-400",
            titleColor: "text-amber-800 dark:text-amber-300",
            textColor: "text-amber-700 dark:text-amber-200",
        },
        success: {
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            border: "border-emerald-200 dark:border-emerald-800",
            icon: CheckCircle,
            iconColor: "text-emerald-600 dark:text-emerald-400",
            titleColor: "text-emerald-800 dark:text-emerald-300",
            textColor: "text-emerald-700 dark:text-emerald-200",
        },
    };

    const s = styles[type];
    const Icon = s.icon;

    return (
        <div className={`${s.bg} ${s.border} border rounded-lg p-4 my-4`}>
            <div className="flex items-start gap-3">
                <Icon size={20} className={`${s.iconColor} flex-shrink-0 mt-0.5`} />
                <div>
                    {title && <p className={`font-semibold text-sm mb-1 ${s.titleColor}`}>{title}</p>}
                    <div className={`text-sm ${s.textColor} leading-relaxed`}>{children}</div>
                </div>
            </div>
        </div>
    );
}

function ShortcutTable({ shortcuts }) {
    return (
        <div className="overflow-x-auto my-4 rounded-lg border border-card-border">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider">
                        <th className="px-4 py-3 text-left font-semibold">Ação</th>
                        <th className="px-4 py-3 text-left font-semibold">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {shortcuts.map((item, i) => (
                        <tr
                            key={i}
                            className="border-t border-card-border hover:bg-foreground/5 transition-colors"
                        >
                            <td className="px-4 py-3 font-medium text-foreground">{item.action}</td>
                            <td className="px-4 py-3 text-foreground/60">{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Code({ children }) {
    return (
        <code className="px-2 py-0.5 bg-foreground/10 rounded text-sm font-mono text-[#5C7A53]">
            {children}
        </code>
    );
}

// ─── Página principal ────────────────────────────────────────────────────────
export default function DocumentationPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

    const sections = [
        { id: "visao-geral", label: "Visão Geral do Sistema" },
        { id: "dashboard", label: "Dashboard — Painel de Controle" },
        { id: "funcionarios", label: "Funcionários — Gestão de Equipe" },
        { id: "pacientes", label: "Pacientes — Cadastro e Acompanhamento" },
        { id: "materiais", label: "Materiais — Controle de Estoque" },
        { id: "emprestimos", label: "Empréstimos — Registro e Devolução" },
        { id: "servicos", label: "Serviços — Prestação de Serviços" },
        { id: "glossario", label: "Glossário Técnico" },
    ];

    const [activeSection, setActiveSection] = useState("visao-geral");

    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <main className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
                <div className="p-4 sm:p-8">
                    {/* ── Cabeçalho ─────────────────────────────────────────────── */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-8">
                        <button
                            type="button"
                            onClick={toggleSidebar}
                            className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                            aria-label="Abrir menu"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="p-3 bg-[#5C7A53] rounded-xl shadow-sm flex-shrink-0">
                            <BookOpen className="text-white" size={24} />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                                Documentação do Sistema
                            </h1>
                            <p className="text-foreground/50 text-xs sm:text-sm">
                                Guia completo de uso — Lar e Vida Hospitalar
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* ── Sidebar de navegação interna ────────────────────────── */}
                        <aside className="lg:w-64 flex-shrink-0">
                            <nav className="sticky top-8 space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3 px-3">
                                    Navegação Rápida
                                </p>
                                {sections.map((sec) => (
                                    <button
                                        key={sec.id}
                                        onClick={() => setActiveSection(sec.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${activeSection === sec.id
                                            ? "bg-[#5C7A53] text-white font-medium"
                                            : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                            }`}
                                    >
                                        {sec.label}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* ── Conteúdo principal ──────────────────────────────────── */}
                        <div className="flex-1 min-w-0 space-y-6 max-w-4xl">
                            {/* ══════════════════════════════════════════════════════════
                  VISÃO GERAL
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "visao-geral" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                                            Bem-vindo ao Lar e Vida Hospitalar
                                        </h2>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O <strong>Lar e Vida</strong> é um sistema de gestão hospitalar desenvolvido
                                            para otimizar o acompanhamento de pacientes oncológicos, controle de
                                            funcionários, gerenciamento de materiais, empréstimos e prestação de serviços.
                                            Esta documentação apresenta um guia prático para utilização de todas as
                                            funcionalidades do sistema.
                                        </p>
                                    </div>
                                    <CollapsibleSection title="Módulos do Sistema" icon={Layers} defaultOpen={true}>
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                                            O sistema é composto pelos seguintes módulos principais:
                                        </p>

                                        <ShortcutTable
                                            shortcuts={[
                                                {
                                                    action: "Dashboard",
                                                    description:
                                                        "Painel central com indicadores, gráficos e resumo operacional da instituição.",
                                                },
                                                {
                                                    action: "Funcionários",
                                                    description:
                                                        "Cadastro, edição e gerenciamento da equipe hospitalar.",
                                                },
                                                {
                                                    action: "Pacientes",
                                                    description:
                                                        "Registro de pacientes oncológicos com dados clínicos, pessoais e de contato.",
                                                },
                                                {
                                                    action: "Materiais",
                                                    description:
                                                        "Controle de estoque de materiais hospitalares com quantidades e status.",
                                                },
                                                {
                                                    action: "Empréstimos",
                                                    description:
                                                        "Registro de empréstimos de materiais a pacientes com controle de devolução.",
                                                },
                                                {
                                                    action: "Serviços",
                                                    description:
                                                        "Registro e acompanhamento de serviços prestados aos pacientes.",
                                                },
                                            ]}
                                        />
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Requisitos de Acesso" icon={Shield}>
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                                            Para utilizar o sistema, o usuário deve:
                                        </p>

                                        <ul className="space-y-2 text-sm text-foreground/70">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle size={16} className="text-[#5C7A53] mt-0.5 flex-shrink-0" />
                                                <span>Possuir credenciais de acesso fornecidas pelo administrador.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle size={16} className="text-[#5C7A53] mt-0.5 flex-shrink-0" />
                                                <span>
                                                    Utilizar um navegador moderno (Google Chrome, Mozilla Firefox, Microsoft
                                                    Edge ou Safari em suas versões mais recentes).
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle size={16} className="text-[#5C7A53] mt-0.5 flex-shrink-0" />
                                                <span>
                                                    Manter conexão estável com a internet para acesso aos dados em tempo real.
                                                </span>
                                            </li>
                                        </ul>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  DASHBOARD
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "dashboard" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <LayoutGrid size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Dashboard</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O Dashboard é o painel de controle central do sistema. Ele oferece uma visão
                                            consolidada dos indicadores mais importantes da instituição, permitindo
                                            monitoramento rápido do estado operacional.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como acessar o Dashboard"
                                        icon={MousePointerClick}
                                        defaultOpen={true}
                                    >
                                        <Step number={1} title="Acesse o sistema">
                                            <p>
                                                Faça login com suas credenciais. Após a autenticação, você será
                                                redirecionado automaticamente para o Dashboard.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Navegação pela barra lateral">
                                            <p>
                                                Caso já esteja em outra tela, clique no ícone{" "}
                                                <strong>Dashboard</strong> (ícone de grade) na barra lateral esquerda para
                                                retornar ao painel principal.
                                            </p>
                                        </Step>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Indicadores do Dashboard" icon={ListChecks}>
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                                            O Dashboard exibe os seguintes indicadores em tempo real:
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Total de Pacientes
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Número total de pacientes cadastrados no sistema, com distribuição por
                                                    status (Ativo, Em Tratamento, Alta, Inativo).
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Total de Funcionários
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Quantidade de funcionários ativos e inativos registrados na instituição.
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Empréstimos Ativos
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Número de empréstimos em andamento, incluindo aqueles com prazo de
                                                    devolução vencido (atrasados).
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Materiais em Estoque
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Visão geral do estoque com quantidades totais, disponíveis e emprestadas.
                                                </p>
                                            </div>
                                        </div>

                                        <TipBox type="tip" title="Dica de uso">
                                            Utilize o Dashboard como ponto de partida diário para identificar rapidamente
                                            pendências, como empréstimos atrasados ou pacientes com prioridade urgente.
                                        </TipBox>
                                    </CollapsibleSection>

                                    <CollapsibleSection
                                        title="Como funciona o Dashboard"
                                        icon={Monitor}
                                        defaultOpen={true}
                                    >
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                                            O Dashboard funciona como um <strong>painel de monitoramento em tempo real</strong>.
                                            Ao acessá-lo, você encontra:
                                        </p>

                                        <Step number={1} title="Cards de indicadores (topo da página)">
                                            <p>
                                                Quatro cards exibem os números principais da instituição: total de pacientes,
                                                total de funcionários, empréstimos ativos e materiais em estoque. Cada card
                                                possui um ícone e cor distintos para facilitar a identificação visual.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Gráficos interativos (abaixo dos cards)">
                                            <p>
                                                Logo abaixo, os gráficos são organizados em seções por módulo. Cada gráfico é
                                                interativo — ao passar o mouse sobre as barras ou fatias, você vê os valores
                                                detalhados. Os dados são atualizados automaticamente conforme novos registros
                                                são inseridos no sistema.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Navegação entre seções de gráficos">
                                            <p>
                                                Os gráficos são agrupados em quatro seções: <strong>Funcionários</strong>,{" "}
                                                <strong>Pacientes</strong>, <strong>Empréstimos</strong> e{" "}
                                                <strong>Serviços</strong>. Role a página para visualizar todos ou clique
                                                diretamente na seção desejada.
                                            </p>
                                        </Step>

                                        <TipBox type="info" title="Atualização dos dados">
                                            Todos os gráficos refletem os dados atuais do banco de dados. Ao cadastrar,
                                            editar ou excluir um registro em qualquer módulo, os gráficos do Dashboard são
                                            atualizados automaticamente na próxima renderização da página.
                                        </TipBox>
                                    </CollapsibleSection>

                                    <CollapsibleSection
                                        title="Gráficos disponíveis por módulo"
                                        icon={ChartBar}
                                        defaultOpen={true}
                                    >
                                        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                                            O Dashboard conta com <strong>16 gráficos</strong> distribuídos em quatro
                                            categorias. Confira abaixo cada um deles:
                                        </p>

                                        {/* ── Funcionários ── */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                                                <Hospital size={18} className="text-[#5C7A53]" />
                                                Funcionários
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Status dos Funcionários
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>pizza</strong> que mostra a proporção de
                                                        funcionários por status: Ativo, Inativo e Afastado.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Funcionários por Cargo
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com a distribuição de funcionários
                                                        por cargo (Médico, Enfermeiro, Técnico, Administrativo, etc.).
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Contratações por Mês
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> que exibe o número de contratações
                                                        realizadas em cada mês do ano atual.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Contratações por Ano
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com o histórico de contratações
                                                        agrupadas por ano.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Pacientes ── */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                                                <Users size={18} className="text-[#5C7A53]" />
                                                Pacientes
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Status dos Pacientes
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>pizza</strong> que mostra a proporção de pacientes
                                                        por status: Ativo, Em Tratamento, Alta e Inativo.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Pacientes por Sexo
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>pizza</strong> com a distribuição de pacientes por
                                                        sexo (Masculino, Feminino, Outro).
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Pacientes por Prioridade
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> que exibe a quantidade de pacientes
                                                        em cada nível de prioridade: Baixa, Média, Alta e Urgente.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Pacientes por Tipo de Câncer
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com a distribuição dos pacientes
                                                        pelos tipos de câncer mais comuns registrados.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Empréstimos ── */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                                                <Package size={18} className="text-[#5C7A53]" />
                                                Empréstimos
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Status dos Empréstimos
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>pizza</strong> que mostra a proporção de
                                                        empréstimos por status: Ativo, Devolvido, Atrasado e Cancelado.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Empréstimos por Cidade
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com a distribuição geográfica dos
                                                        empréstimos agrupados por cidade do paciente.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Empréstimos Mensais
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> que exibe o volume de empréstimos
                                                        realizados em cada mês do ano.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Quantidade de Materiais Emprestados
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com a quantidade total de materiais
                                                        emprestados, agrupados por tipo de material.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Serviços ── */}
                                        <div>
                                            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                                                <Wrench size={18} className="text-[#5C7A53]" />
                                                Serviços
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Status dos Serviços
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>pizza</strong> que mostra a proporção de serviços
                                                        por status (Realizado, Pendente, Cancelado, etc.).
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Serviços por Tipo
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com a distribuição dos serviços
                                                        por tipo (Consulta, Exame, Procedimento, Atendimento).
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Serviços por Responsável
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> que exibe a quantidade de serviços
                                                        realizados por cada profissional responsável.
                                                    </p>
                                                </div>
                                                <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                    <h5 className="font-semibold text-sm text-foreground mb-1">
                                                        Valor por Tipo de Serviço
                                                    </h5>
                                                    <p className="text-xs text-foreground/60">
                                                        Gráfico de <strong>barras</strong> com o valor total acumulado por
                                                        tipo de serviço, permitindo análise financeira.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <TipBox type="tip" title="Dica de análise">
                                            Utilize os gráficos do Dashboard para identificar tendências, como aumento no
                                            número de empréstimos em determinados meses, tipos de câncer mais frequentes
                                            ou profissionais com maior volume de serviços prestados.
                                        </TipBox>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  FUNCIONÁRIOS
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "funcionarios" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Hospital size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Funcionários</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O módulo de Funcionários permite o cadastro, edição e gerenciamento de todos
                                            os colaboradores da instituição, incluindo médicos, enfermeiros, técnicos e
                                            equipe administrativa.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como cadastrar um novo funcionário"
                                        icon={UserPlus}
                                        defaultOpen={true}
                                    >

                                        <Image src="" />
                                        <Step number={1} title="Acesse o módulo de Funcionários">
                                            <p>
                                                Na barra lateral esquerda, clique no ícone <strong>Funcionários</strong>{" "}
                                                (ícone de hospital). A página exibirá a lista de todos os funcionários
                                                cadastrados.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Clique em 'Novo Funcionário'">
                                            <p>
                                                No canto superior direito da tela, localize e clique no botão verde{" "}
                                                <strong>"Novo Funcionário"</strong>. Uma janela modal será aberta com o
                                                formulário de cadastro.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Preencha os dados do funcionário">
                                            <p>O formulário de cadastro contém os seguintes campos obrigatórios:</p>

                                            <div className="overflow-x-auto my-3 rounded-lg border border-card-border">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider">
                                                            <th className="px-4 py-3 text-left font-semibold">Campo</th>
                                                            <th className="px-4 py-3 text-left font-semibold">Descrição</th>
                                                            <th className="px-4 py-3 text-center font-semibold">Obrigatório</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">
                                                                Nome Completo
                                                            </td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Nome completo do funcionário
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">Cargo</td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Ex: Médico, Enfermeiro, Técnico, Administrativo
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">Email</td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Email corporativo do funcionário
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">Telefone</td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Telefone para contato
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">Status</td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Ativo, Inativo ou Afastado
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                        <tr className="border-t border-card-border">
                                                            <td className="px-4 py-3 font-medium text-foreground">
                                                                Data de Contratação
                                                            </td>
                                                            <td className="px-4 py-3 text-foreground/60">
                                                                Data de início do funcionário na instituição
                                                            </td>
                                                            <td className="px-4 py-3 text-center text-red-500">Sim</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Step>

                                        <Step number={4} title="Salve o cadastro">
                                            <p>
                                                Após preencher todos os campos obrigatórios, clique no botão{" "}
                                                <strong>"Salvar"</strong> (ícone de disquete). O sistema validará os dados e,
                                                se tudo estiver correto, exibirá uma mensagem de sucesso. O novo funcionário
                                                aparecerá imediatamente na listagem.
                                            </p>
                                        </Step>

                                        <TipBox type="info" title="Informação">
                                            Caso deseje limpar o formulário e recomeçar, clique no botão{" "}
                                            <strong>"Limpar"</strong> (ícone de reset). Para fechar o modal sem salvar,
                                            clique no <strong>"X"</strong> no canto superior direito ou fora do modal.
                                        </TipBox>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Como editar ou excluir um funcionário">
                                        <Step number={1} title="Localize o funcionário na lista">
                                            <p>
                                                Utilize o campo de <strong>pesquisa</strong> (ícone de lupa) no topo da
                                                tabela para filtrar funcionários pelo nome, email ou cargo.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Ações disponíveis">
                                            <p>
                                                Na coluna <strong>"Ações"</strong> de cada registro, você encontra dois
                                                botões:
                                            </p>
                                            <ul className="space-y-2 mt-2">
                                                <li className="flex items-center gap-2">
                                                    <Edit size={16} className="text-blue-500" />
                                                    <span>
                                                        <strong>Editar</strong> (ícone de lápis) — Abre o modal de edição com os
                                                        dados preenchidos para alteração.
                                                    </span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Trash2 size={16} className="text-red-500" />
                                                    <span>
                                                        <strong>Excluir</strong> (ícone de lixeira) — Remove o funcionário do
                                                        sistema após confirmação.
                                                    </span>
                                                </li>
                                            </ul>
                                        </Step>

                                        <TipBox type="warning" title="Atenção">
                                            A exclusão de um funcionário é uma ação irreversível. Certifique-se de que
                                            realmente deseja remover o registro antes de confirmar.
                                        </TipBox>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  PACIENTES
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "pacientes" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Users size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Pacientes</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O módulo de Pacientes é o coração do sistema. Ele permite o cadastro completo
                                            de pacientes oncológicos, incluindo dados pessoais, informações clínicas
                                            (tipo de câncer, CID), endereço e contato.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como cadastrar um novo paciente"
                                        icon={UserPlus}
                                        defaultOpen={true}
                                    >
                                        <Image />

                                        <Step number={1} title="Acesse o módulo de Pacientes">
                                            <p>
                                                Na barra lateral, clique no ícone <strong>Pacientes</strong> (ícone de
                                                pessoas). A página exibirá a lista de pacientes cadastrados.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Clique em 'Novo Paciente'">
                                            <p>
                                                No canto superior direito, clique no botão verde{" "}
                                                <strong>"Novo Paciente"</strong>. O modal de cadastro será aberto.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Preencha os dados pessoais">
                                            <p>
                                                A primeira seção do formulário solicita os <strong>Dados Pessoais</strong>:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    <strong>Foto do Paciente</strong> — Opcional. Aceita PNG, JPG ou WEBP até
                                                    4,5 MB.
                                                </li>
                                                <li>
                                                    <strong>Nome Completo</strong> — Nome do paciente.
                                                </li>
                                                <li>
                                                    <strong>CPF</strong> — Cadastro de Pessoa Física.
                                                </li>
                                                <li>
                                                    <strong>RG</strong> — Registro Geral.
                                                </li>
                                                <li>
                                                    <strong>Sexo</strong> — Masculino, Feminino ou Outro.
                                                </li>
                                                <li>
                                                    <strong>Nascimento</strong> — Data de nascimento.
                                                </li>
                                                <li>
                                                    <strong>Status</strong> — Ativo, Em Tratamento, Alta ou Inativo.
                                                </li>
                                                <li>
                                                    <strong>Prioridade</strong> — Baixa, Média, Alta ou Urgente.
                                                </li>
                                                <li>
                                                    <strong>Profissão</strong> — Opcional.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={4} title="Preencha as informações clínicas">
                                            <p>
                                                Na seção <strong>Informações Clínicas</strong>, registre:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    <strong>Tipo de Câncer</strong> — Ex: "Neoplasia maligna da mama".
                                                </li>
                                                <li>
                                                    <strong>CID Principal</strong> — Código da Classificação Internacional de
                                                    Doenças (Ex: C50.4).
                                                </li>
                                                <li>
                                                    <strong>CID Secundário</strong> — Opcional, para comorbidades associadas.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={5} title="Preencha endereço e contato">
                                            <p>
                                                Informe o <strong>endereço</strong> (rua, número, CEP, bairro, cidade) e os{" "}
                                                <strong>telefones</strong> de contato do paciente.
                                            </p>
                                        </Step>

                                        <Step number={6} title="Salve o cadastro">
                                            <p>
                                                Clique em <strong>"Salvar"</strong> para finalizar. O paciente será
                                                cadastrado e aparecerá na listagem principal.
                                            </p>
                                        </Step>

                                        <TipBox type="tip" title="Dica importante">
                                            Utilize o campo <strong>Prioridade</strong> para sinalizar casos urgentes. Isso
                                            ajuda a equipe a identificar rapidamente pacientes que necessitam de atenção
                                            imediata no Dashboard e nas listagens.
                                        </TipBox>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Como pesquisar e gerenciar pacientes">
                                        <Step number={1} title="Pesquise por pacientes">
                                            <p>
                                                Utilize o campo de busca no topo da tabela para localizar pacientes pelo
                                                nome, CPF ou qualquer outro dado visível na listagem.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Edite ou exclua registros">
                                            <p>
                                                Na coluna <strong>"Ações"</strong>, utilize os botões de editar (lápis) ou
                                                excluir (lixeira) para gerenciar cada paciente.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Navegação entre páginas">
                                            <p>
                                                Caso haja muitos pacientes, utilize a <strong>paginação</strong> no final da
                                                tabela para navegar entre as páginas (15 registros por página).
                                            </p>
                                        </Step>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  MATERIAIS
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "materiais" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Package size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Materiais</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O módulo de Materiais gerencia o estoque de itens hospitalares disponíveis
                                            para empréstimo. O controle é feito por quantidade total, quantidade
                                            disponível e quantidade emprestada.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como cadastrar um novo material"
                                        icon={UserPlus}
                                        defaultOpen={true}
                                    >
                                        <Step number={1} title="Acesse o módulo de Materiais">
                                            <p>
                                                Na barra lateral, clique no ícone <strong>Materiais</strong>. A página exibe
                                                a listagem com nome, descrição, quantidades e status de cada material.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Clique em 'Novo Material'">
                                            <p>
                                                No canto superior direito, clique no botão <strong>"Novo Material"</strong>.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Preencha os dados">
                                            <p>O formulário solicita:</p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    <strong>Nome</strong> — Nome do material (ex: "Cadeira de Rodas").
                                                </li>
                                                <li>
                                                    <strong>Descrição</strong> — Detalhes sobre o material.
                                                </li>
                                                <li>
                                                    <strong>Quantidade Total</strong> — Quantidade adquirida.
                                                </li>
                                                <li>
                                                    <strong>Quantidade Atual</strong> — Quantidade disponível para empréstimo.
                                                </li>
                                                <li>
                                                    <strong>Status</strong> — Ativo ou Inativo.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={4} title="Salve o material">
                                            <p>
                                                Clique em <strong>"Salvar"</strong>. O material será adicionado ao estoque e
                                                ficará disponível para empréstimos.
                                            </p>
                                        </Step>

                                        <TipBox type="info" title="Controle de Estoque">
                                            O sistema calcula automaticamente a quantidade emprestada (Total - Atual).
                                            Materiais com quantidade atual igual a zero não aparecem como opção no
                                            formulário de empréstimo.
                                        </TipBox>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  EMPRÉSTIMOS
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "emprestimos" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Package size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Empréstimos</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O módulo de Empréstimos permite registrar a saída de materiais hospitalares
                                            para pacientes, controlar prazos de devolução e gerenciar o status de cada
                                            empréstimo.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como realizar um novo empréstimo"
                                        icon={ClipboardList}
                                        defaultOpen={true}
                                    >
                                        <Image />

                                        <Step number={1} title="Acesse o módulo de Empréstimos">
                                            <p>
                                                Na barra lateral, clique no ícone <strong>Empréstimos</strong>. A página
                                                exibe todos os empréstimos registrados.
                                            </p>
                                        </Step>

                                        <Step number={2} title="Clique em 'Novo Empréstimo'">
                                            <p>
                                                No canto superior direito, clique no botão{" "}
                                                <strong>"Novo Empréstimo"</strong>.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Busque o paciente pelo CPF">
                                            <p>
                                                No campo <strong>CPF</strong>, digite o CPF do paciente e clique no botão de{" "}
                                                <strong>busca</strong> (ícone de lupa ao lado do campo). O sistema
                                                automaticamente preencherá os dados do paciente (nome, RG, nascimento,
                                                endereço e telefones) caso ele já esteja cadastrado.
                                            </p>

                                            <TipBox type="success" title="Funcionalidade inteligente">
                                                A busca automática por CPF evita a digitação duplicada de dados e reduz
                                                erros de cadastro. Caso o paciente não seja encontrado, preencha os dados
                                                manualmente — o paciente será cadastrado junto com o empréstimo.
                                            </TipBox>
                                        </Step>

                                        <Step number={4} title="Configure os dados do empréstimo">
                                            <p>Preencha as informações específicas do empréstimo:</p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    <strong>Data do Empréstimo</strong> — Preenchida automaticamente com a
                                                    data atual.
                                                </li>
                                                <li>
                                                    <strong>Status</strong> — Geralmente "Ativo" no momento da criação.
                                                </li>
                                                <li>
                                                    <strong>Previsão de Devolução</strong> — Data estimada para devolução.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={5} title="Selecione o material e quantidade">
                                            <p>
                                                Na seção <strong>Materiais Emprestados</strong>:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    Selecione o <strong>material</strong> desejado no menu suspenso. Apenas
                                                    materiais com estoque disponível são exibidos.
                                                </li>
                                                <li>
                                                    Informe a <strong>quantidade</strong> a ser emprestada.
                                                </li>
                                                <li>
                                                    No campo de texto, descreva os materiais e observações relevantes sobre o
                                                    empréstimo.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={6} title="Finalize o empréstimo">
                                            <p>
                                                Revise todos os dados e clique em <strong>"Salvar"</strong>. O sistema
                                                registrará o empréstimo e atualizará automaticamente o estoque do material.
                                            </p>
                                        </Step>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Gerenciamento de empréstimos">
                                        <Step number={1} title="Acompanhe os status">
                                            <p>
                                                Na listagem de empréstimos, cada registro exibe um status com código de
                                                cores:
                                            </p>
                                            <div className="flex flex-wrap gap-3 my-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                    Ativo
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                    Devolvido
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                                    Atrasado
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">
                                                    Cancelado
                                                </span>
                                            </div>
                                        </Step>

                                        <Step number={2} title="Registre a devolução">
                                            <p>
                                                Para registrar a devolução de um material, edite o empréstimo, altere o
                                                status para <strong>"Devolvido"</strong> e informe a{" "}
                                                <strong>Data de Devolução</strong>. O estoque do material será atualizado
                                                automaticamente.
                                            </p>
                                        </Step>

                                        <Step number={3} title="Identifique atrasos">
                                            <p>
                                                O sistema marca automaticamente como <strong>"Atrasado"</strong> os
                                                empréstimos cuja data de previsão de devolução já passou e ainda não foram
                                                devolvidos. Fique atento a esses registros no Dashboard.
                                            </p>
                                        </Step>

                                        <TipBox type="warning" title="Atenção">
                                            Empréstimos com status <strong>"Atrasado"</strong> devem ser priorizados para
                                            devolução. O não cumprimento dos prazos pode impactar a disponibilidade de
                                            materiais para outros pacientes.
                                        </TipBox>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  SERVIÇOS
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "servicos" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Wrench size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Serviços</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            O módulo de Serviços permite registrar e acompanhar os serviços prestados aos
                                            pacientes, como consultas, exames, procedimentos e atendimentos
                                            multidisciplinares.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Como registrar um novo serviço"
                                        icon={ClipboardList}
                                        defaultOpen={true}
                                    >
                                        <Step number={1} title="Acesse o módulo de Serviços">
                                            <p>
                                                Na barra lateral, clique no ícone <strong>Serviços</strong> (ícone de
                                                chave inglesa).
                                            </p>
                                        </Step>

                                        <Step number={2} title="Clique em 'Novo Serviço'">
                                            <p>Clique no botão <strong>"Novo Serviço"</strong> no canto superior direito.</p>
                                        </Step>

                                        <Step number={3} title="Preencha os dados do serviço">
                                            <p>O formulário de serviço inclui:</p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/70 mt-2">
                                                <li>
                                                    <strong>Paciente</strong> — Selecione o paciente que receberá o serviço.
                                                </li>
                                                <li>
                                                    <strong>Tipo de Serviço</strong> — Ex: Consulta, Exame, Procedimento,
                                                    Atendimento.
                                                </li>
                                                <li>
                                                    <strong>Descrição</strong> — Detalhamento do serviço prestado.
                                                </li>
                                                <li>
                                                    <strong>Data</strong> — Data de realização do serviço.
                                                </li>
                                                <li>
                                                    <strong>Responsável</strong> — Profissional que realizou o serviço.
                                                </li>
                                            </ul>
                                        </Step>

                                        <Step number={4} title="Salve o registro">
                                            <p>
                                                Clique em <strong>"Salvar"</strong> para registrar o serviço no histórico do
                                                paciente.
                                            </p>
                                        </Step>
                                    </CollapsibleSection>
                                </>
                            )}

                            {/* ══════════════════════════════════════════════════════════
                  GLOSSÁRIO
              ══════════════════════════════════════════════════════════ */}
                            {activeSection === "glossario" && (
                                <>
                                    <div className="bg-gradient-to-br from-[#5C7A53] to-[#4A6342] rounded-2xl p-6 sm:p-8 text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <BookOpen size={28} />
                                            <h2 className="text-2xl sm:text-3xl font-bold">Glossário Técnico</h2>
                                        </div>
                                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                                            Termos técnicos e executivos utilizados no sistema e na documentação.
                                        </p>
                                    </div>

                                    <CollapsibleSection
                                        title="Termos Técnicos"
                                        icon={FileText}
                                        defaultOpen={true}
                                    >
                                        <div className="overflow-x-auto rounded-lg border border-card-border">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider">
                                                        <th className="px-4 py-3 text-left font-semibold">Termo</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Definição</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            API
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Interface de Programação de Aplicações. Conjunto de rotinas e padrões
                                                            que permitem a comunicação entre diferentes sistemas.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            CID
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Classificação Internacional de Doenças. Sistema de codificação usado
                                                            para classificar doenças e problemas relacionados à saúde.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            CRUD
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Create, Read, Update, Delete. Operações básicas de criação, leitura,
                                                            atualização e exclusão de registros em um sistema.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            ORM
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Object-Relational Mapping. Técnica que mapeia objetos para bancos de
                                                            dados relacionais, facilitando a manipulação dos dados.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Prisma
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            ORM utilizado no sistema para comunicação com o banco de dados SQLite.
                                                            Oferece type-safety e consultas otimizadas.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            SQLite
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Sistema de gerenciamento de banco de dados relacional leve e
                                                            embarcado, utilizado como base de dados da aplicação.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Next.js
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Framework React para produção, utilizado no desenvolvimento do
                                                            frontend e backend da aplicação.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Tailwind CSS
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Framework CSS utilitário utilizado para estilização da interface,
                                                            permitindo design responsivo e personalizado.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            XSS
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Cross-Site Scripting. Tipo de vulnerabilidade de segurança que permite
                                                            a injeção de scripts maliciosos. O sistema possui proteção contra XSS.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Modal
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Janela de diálogo sobreposta à página principal, utilizada para
                                                            formulários de cadastro e edição sem redirecionamento.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Termos Executivos / Funcionais" icon={Settings}>
                                        <div className="overflow-x-auto rounded-lg border border-card-border">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider">
                                                        <th className="px-4 py-3 text-left font-semibold">Termo</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Definição</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Dashboard
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Painel de controle com indicadores visuais e gráficos para
                                                            monitoramento rápido do estado operacional da instituição.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Paciente Oncológico
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Paciente diagnosticado com neoplasia (câncer) que está em
                                                            acompanhamento na instituição.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Prioridade
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Nível de urgência atribuído ao paciente (Baixa, Média, Alta, Urgente)
                                                            para direcionamento de recursos e atenção da equipe.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Empréstimo
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Registro de saída de material hospitalar para um paciente, com
                                                            controle de prazo e status de devolução.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Estoque
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Controle de quantidades de materiais hospitalares disponíveis,
                                                            emprestados e totais.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Sidebar
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Barra lateral de navegação que dá acesso a todos os módulos do
                                                            sistema. Pode ser expandida ou recolhida.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Tema Claro/Escuro
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Funcionalidade que permite alternar entre o modo claro e escuro da
                                                            interface, disponível no rodapé da barra lateral.
                                                        </td>
                                                    </tr>
                                                    <tr className="border-t border-card-border">
                                                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                                            Paginação
                                                        </td>
                                                        <td className="px-4 py-3 text-foreground/60">
                                                            Mecanismo de divisão de resultados em páginas (15 registros por
                                                            página) para facilitar a navegação em listas extensas.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </CollapsibleSection>

                                    <CollapsibleSection title="Perguntas Frequentes (FAQ)" icon={HelpCircle}>
                                        <div className="space-y-4">
                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Como faço para recuperar minha senha de acesso?
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Procure o administrador do sistema para solicitar a redefinição de senha. A funcionalidade de recuperação autônoma será implementada em versões futuras.
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Posso editar um empréstimo após ele ser registrado?
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Sim. Na listagem de empréstimos, clique no ícone de editar (lápis) para
                                                    alterar dados como status, data de devolução e materiais emprestados.
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    O que acontece com o estoque quando um empréstimo é registrado?
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    A quantidade disponível do material é reduzida automaticamente. Quando a
                                                    devolução é registrada, o estoque é atualizado novamente.
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    Como alternar entre o tema claro e escuro?
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    No rodapé da barra lateral esquerda, localize o botão de alternância de
                                                    tema (ícone de sol/lua). Clique para alternar entre os modos.
                                                </p>
                                            </div>

                                            <div className="bg-foreground/5 rounded-lg p-4 border border-card-border">
                                                <h4 className="font-semibold text-sm text-foreground mb-1">
                                                    É possível cadastrar um paciente sem informar o CPF?
                                                </h4>
                                                <p className="text-xs text-foreground/60">
                                                    Não. O CPF é um campo obrigatório no cadastro de pacientes, pois é
                                                    utilizado como identificador único e para busca automática no módulo de
                                                    empréstimos.
                                                </p>
                                            </div>
                                        </div>
                                    </CollapsibleSection>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </AppShell>
    );
}
