"use client";
import { LayoutGrid, Users, Package, Wrench, Sun, Moon, Hospital, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const toggleLabel = isDark ? "Modo Claro" : "Modo Escuro";

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { path: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { path: "/funcionarios", icon: Hospital, label: "Funcionários" },
    { path: "/pacientes", icon: Users, label: "Pacientes" },
    { path: "/emprestimos", icon: Package, label: "Empréstimos" },
    { path: "/servicos", icon: Wrench, label: "Serviços" },
  ];

  return (
    <>
      {/* BACKDROP: Fundo escurecido apenas no mobile quando a sidebar estiver aberta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:sticky top-0 left-0 h-screen flex flex-col p-4 transition-all duration-300 z-50
          ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0 overflow-hidden md:overflow-visible"}
        `}
        style={{
          backgroundColor: isDark ? '#2A2927' : '#F5F5F5',
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E5E5E5'}`
        }}
      >
        {/* Topo da Sidebar com o Botão de Três Riscos sempre acessível */}
        <div className={`flex items-center mb-10 min-h-[72px] ${isOpen ? "justify-between ml-2" : "justify-center"}`}>
          {isOpen ? (
            <>
              {/* LOGO E TEXTO ENVOLVIDOS NO LINK PARA VOLTAR À HOME */}
              <Link
                href="/home"
                className="flex items-center gap-3 animate-fadeIn hover:opacity-80 transition-opacity cursor-pointer min-w-0"
              >
                <div className="relative h-12 w-12 rounded-full p-2 flex-shrink-0" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`, backdropFilter: 'blur(8px)' }}>
                  <Image
                    src="/logo.png"
                    alt="Logo Lar e Vida"
                    fill
                    className="object-contain p-0"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-sm leading-none truncate" style={{ color: isDark ? '#FAFAFA' : '#1D1C1A' }}>
                    Lar e Vida
                  </h2>
                  <p className="text-xs truncate mt-1" style={{ color: isDark ? '#A3A3A3' : '#737373' }}>Hospitalar</p>
                </div>
              </Link>

              {/* Botão de fechar (3 riscos) - Visível tanto no PC quanto no Mobile quando a barra está aberta */}
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                style={{ color: isDark ? '#A3A3A3' : '#737373' }}
                aria-label="Recolher barra lateral"
              >
                <Menu size={20} />
              </button>
            </>
          ) : (
            /* Botão de abrir (3 riscos) - Visível apenas no PC quando recolhida */
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
              style={{ color: isDark ? '#A3A3A3' : '#737373' }}
              aria-label="Expandir barra lateral"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Itens de Navegação */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={!isOpen ? item.label : undefined}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                  isOpen ? "gap-3" : "justify-center"
                } ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-transparent hover:bg-white/10"
                }`}
                style={{
                  color: isActive ? '#FAFAFA' : (isDark ? '#A3A3A3' : '#737373')
                }}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="font-medium text-sm truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="mt-auto border-t pt-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E5E5' }}>
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            disabled={!mounted}
            aria-label={mounted ? `Ativar ${toggleLabel.toLowerCase()}` : "Carregando tema"}
            className={`flex items-center py-2 transition-colors ${
              isOpen ? "gap-3 px-4" : "justify-center"
            } ${mounted ? "cursor-pointer" : "cursor-default opacity-70"}`}
            style={{ color: isDark ? '#A3A3A3' : '#737373' }}
          >
            <span className="relative flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-foreground/15 transition-colors duration-300">
              <span
                className={`absolute h-5 w-5 rounded-full bg-primary transition-transform duration-300 ease-out ${
                  isDark ? "translate-x-5" : "translate-x-1"
                }`}
              />
              {isDark ? (
                <Moon size={12} className="absolute left-1 text-white/80" />
              ) : (
                <Sun size={12} className="absolute right-1 text-white/80" />
              )}
            </span>
            {isOpen && <span className="font-medium text-sm truncate">{toggleLabel}</span>}
          </button>
        </div>
      </div>
    </>
  );
}
