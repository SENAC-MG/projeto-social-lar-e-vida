"use client";

import { LayoutGrid, Users, Package, Wrench, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { path: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { path: "/pacientes", icon: Users, label: "Pacientes" },
    { path: "/emprestimos", icon: Package, label: "Empréstimos" },
    { path: "/servicos", icon: Wrench, label: "Serviços" },
  ];

  return (
    <div className="w-64 h-screen bg-black flex flex-col p-4 border-r border-gray-800">
      <div className="flex items-center gap-3 mb-10 ml-2">
        <div className="relative h-18 w-18 rounded-full bg-white/10 p-2 backdrop-blur-md border border-white/20">
          <Image
            src="/logo.png"
            alt="Logo Lar e Vida"
            fill
            className="object-contain p-0"
          />
        </div>
        <div>
          <h2 className="text-white font-bold text-sm leading-none">
            Lar e Vida
          </h2>
          <p className="text-gray-500 text-xs">Hospitalar</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-gray-800 pt-4">
        <button className="flex items-center gap-3 w-full text-gray-400 hover:text-white px-4 py-2 transition-colors">
          <Sun size={20} />
          <span className="font-medium">Modo Claro</span>
        </button>
      </div>
    </div>
  );
}
