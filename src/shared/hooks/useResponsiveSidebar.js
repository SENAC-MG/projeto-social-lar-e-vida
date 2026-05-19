'use client';

import { useEffect, useState } from 'react';

export function useResponsiveSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return { isSidebarOpen, setIsSidebarOpen, toggleSidebar };
}
