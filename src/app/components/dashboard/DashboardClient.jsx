"use client";

import AppShell from "@/shared/layouts/AppShell";
import DashboardCards from "./DashboardCards";
import DashboardGraphics from "./DashboardGraphics";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";

export default function DashboardClient({ graficos, dashboardStats }) {
  const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

  return (
    <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
        <main className="w-full max-w-6xl mx-auto px-4 py-8 flex-1">
          <DashboardCards dados={dashboardStats} />
          <DashboardGraphics graficos={graficos} />
        </main>
      </div>
    </AppShell>
  );
}
