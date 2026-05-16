"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Sun, Moon } from "lucide-react";
import Sidebar from "../components/sideBar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true; // Default dark baseado no print
    return localStorage.getItem("theme") !== "light";
  });

  // Forçar a sidebar a começar aberta se for Desktop
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-100 transition-colors duration-300 flex overflow-x-hidden">
      {/* Sidebar integrada ao controle responsivo */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Container principal que ocupa o resto da tela */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-950 h-screen relative overflow-hidden">
        
        {/* CABEÇALHO SUPERIOR (Alinhado com a identidade das outras páginas) */}
        <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-3">
            {/* Botão Hambúrguer visível apenas no Mobile */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors md:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden sm:block">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Apoio Hospitalar</span>
              <h2 className="text-sm font-bold text-white -mt-1">Lar e Vida</h2>
            </div>
          </div>

        </header>

        {/* SEÇÃO HERO: Background total com Logo centralizada */}
        <div className="flex-1 flex items-center justify-center relative p-4">
          
          {/* Imagem de Fundo (Pacientes) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/pacientes-background.jpg"
              alt="Pacientes Background"
              fill
              priority
              className="object-cover object-center filter brightness-[0.25] dark:brightness-[0.15]"
            />
            {/* Vinheta escura nas bordas para misturar a imagem com o fundo da aplicação */}
            <div className="absolute inset-0 bg-[#0a0c10]/20 backdrop-blur-[1px]" />
          </div>

          {/* CONTAINER DA LOGO: Centralizada e Grande */}
          <div className="relative z-10 w-full max-w-[280px] h-[280px] sm:max-w-[480px] sm:h-[480px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transform transition-transform duration-500 ease-out select-none">
            <Image
              src="/logo.png"
              alt="Logo Lar e Vida"
              fill
              priority
              className="object-contain"
            />
          </div>

        </div>

      </main>
    </div>
  );
}