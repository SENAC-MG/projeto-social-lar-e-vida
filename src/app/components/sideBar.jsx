"use client";
import { LayoutGrid, Users, Package, Wrench, Sun, Hospital, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();

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
        className={`fixed md:sticky top-0 left-0 h-screen bg-black flex flex-col p-4 border-r border-gray-800 transition-all duration-300 z-50
          ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0 overflow-hidden md:overflow-visible"}
        `}
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
                <div className="relative h-12 w-12 rounded-full bg-white/10 p-2 backdrop-blur-md border border-white/20 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Logo Lar e Vida"
                    fill
                    className="object-contain p-0"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-sm leading-none truncate">
                    Lar e Vida
                  </h2>
                  <p className="text-gray-500 text-xs truncate mt-1">Hospitalar</p>
                </div>
              </Link>
              
              {/* Botão de fechar (3 riscos) - Visível tanto no PC quanto no Mobile quando a barra está aberta */}
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                aria-label="Recolher barra lateral"
              >
                <Menu size={20} />
              </button>
            </>
          ) : (
            /* Botão de abrir (3 riscos) - Visível apenas no PC quando recolhida */
            <button 
              onClick={toggleSidebar}
              className="hidden md:block text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
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
                    ? "bg-[#F97316] text-white"
                    : "bg-transparent text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="font-medium text-sm truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="mt-auto border-t border-gray-800 pt-4">
          <button 
            className={`flex items-center w-full text-gray-400 hover:text-white py-2 transition-colors ${
              isOpen ? "gap-3 px-4" : "justify-center"
            }`}
          >
            <Sun size={20} className="flex-shrink-0" />
            {isOpen && <span className="font-medium text-sm truncate">Modo Claro</span>}
          </button>
        </div>
      </div>
    </>
  );
}