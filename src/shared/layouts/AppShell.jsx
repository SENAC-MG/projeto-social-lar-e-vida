'use client';

import Sidebar from '@/app/components/sideBar';

export default function AppShell({ isSidebarOpen, toggleSidebar, children }) {
    return (
        <div className='min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300'>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main
                className={`flex flex-col min-h-screen bg-background transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
                    }`}
            >
                {children}
            </main>
        </div>
    );
}
