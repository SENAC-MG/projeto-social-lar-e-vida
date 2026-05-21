'use client';

import Sidebar from '@/app/components/sideBar';

export default function AppShell({ isSidebarOpen, toggleSidebar, children }) {
  return (
    <div className='min-h-screen bg-background text-foreground flex overflow-x-hidden transition-colors duration-300'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className='flex-1 flex flex-col min-w-0 bg-background transition-all duration-300'>{children}</main>
    </div>
  );
}
