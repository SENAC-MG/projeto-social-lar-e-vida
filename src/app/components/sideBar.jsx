"use client";

import {
  LayoutGrid,
  Users,
  Package,
  Wrench,
  Sun,
  Moon,
  Hospital,
  Menu,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@wrksz/themes/client";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const nextTheme = isDark ? "light" : "dark";
  const toggleLabel = isDark ? "Modo Claro" : "Modo Escuro";

  // Mantive as outras variáveis de cores caso queira usá-las nos textos/bordas
  const textColor = isDark ? "#A3A3A3" : "#737373";
  const titleColor = isDark ? "#FAFAFA" : "#1D1C1A";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "#E5E5E5";
  const logoBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  const logoBorder = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";

  const navItems = [
    { path: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { path: "/funcionarios", icon: Hospital, label: "Funcionários" },
    { path: "/pacientes", icon: Users, label: "Pacientes" },
    { path: "/emprestimos", icon: Package, label: "Empréstimos" },
    { path: "/servicos", icon: Wrench, label: "Serviços" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen flex flex-col p-4 transition-all duration-300 z-50 
    bg-gray-100 dark:bg-black
    ${isOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full md:w-20 md:translate-x-0 overflow-hidden md:overflow-visible"
          }
  `}
        style={{
          borderRight: `1px solid ${borderColor}`,
        }}
      >
        <div
          className={`flex items-center mb-10 min-h-[72px] ${isOpen ? "justify-between ml-2" : "justify-center"
            }`}
        >
          {isOpen ? (
            <>
              <Link
                href="/home"
                className="flex items-center gap-3 animate-fadeIn hover:opacity-80 transition-opacity cursor-pointer min-w-0"
              >
                <div
                  className="relative h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-md"
                  style={{
                    backgroundColor: logoBg || "rgba(39, 39, 42, 0.6)",
                    borderColor: logoBorder || "rgba(63, 63, 70, 0.4)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                  <Image
                    src={logo}
                    alt="Logo"
                    className="w-[90%] h-[90%] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  />
                </div>

                <div className="min-w-0">
                  <h2
                    className="font-bold text-sm leading-none truncate"
                    style={{ color: titleColor }}
                  >
                    Lar e Vida
                  </h2>
                  <p
                    className="text-xs truncate mt-1"
                    style={{ color: textColor }}
                  >
                    Hospitalar
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                style={{ color: textColor }}
                aria-label="Recolher barra lateral"
              >
                <Menu size={20} />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
              style={{ color: textColor }}
              aria-label="Expandir barra lateral"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                title={!isOpen ? item.label : undefined}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${isOpen ? "gap-3" : "justify-center"
                  } ${isActive
                    ? "bg-primary text-white"
                    : "bg-transparent hover:bg-white/10"
                  }`}
                style={{
                  color: isActive ? "#FAFAFA" : textColor,
                }}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t pt-4" style={{ borderColor }}>
          <button
            type="button"
            onClick={() => mounted && setTheme(nextTheme)}
            disabled={!mounted}
            aria-label={
              mounted
                ? `Ativar ${toggleLabel.toLowerCase()}`
                : "Carregando tema"
            }
            className={`flex items-center py-2 transition-colors ${isOpen ? "gap-3 px-4" : "justify-center"
              } ${mounted ? "cursor-pointer" : "cursor-default opacity-70"}`}
            style={{ color: textColor }}
          >
            <span className="relative flex h-6 w-11 flex-shrink-0 items-center rounded-full bg-foreground/15 transition-colors duration-300">
              <span
                className={`absolute h-5 w-5 rounded-full bg-primary transition-transform duration-300 ease-out ${isDark ? "translate-x-5" : "translate-x-1"
                  }`}
              />

              {isDark ? (
                <Moon size={12} className="absolute left-1 text-white/80" />
              ) : (
                <Sun size={12} className="absolute right-1 text-white/80" />
              )}
            </span>

            {isOpen && (
              <span className="font-medium text-sm truncate">
                {toggleLabel}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
