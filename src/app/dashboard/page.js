"use client";
import Image from "next/image";
import AppShell from "@/shared/layouts/AppShell";
import DashboardCards from "../components/DashboardCards";
import DashboardGraphics from "../components/DashboardGraphics";

import { Menu } from "lucide-react";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";

export default function DashboardPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <div className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
                <header className="bg-transparent sticky top-0 z-30 w-full">
                    <div className="max-w-6xl w-full mx-auto px-4 py-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">
                            {/* ÍCONE DE TRÊS RISCOS (MENU HAMBÚRGUER): Aparece apenas no Mobile */}
                            <button
                                onClick={toggleSidebar}
                                className="bg-card-bg text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden mr-1"
                                aria-label="Abrir menu"
                            >
                                <Menu size={24} />
                            </button>

                        </div>

                    </div>
                </header>

                <main className="w-full max-w-6xl mx-auto px-4 py-8 flex-1">
                    <DashboardCards />
                    <DashboardGraphics />
                </main>
            </div>
        </AppShell>
    );
}
