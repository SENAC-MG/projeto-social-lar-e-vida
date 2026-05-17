import { useState, useEffect } from 'react'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={
                    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                }
                className={`relative flex items-center w-20 h-10 rounded-full transition-all duration-500 ${theme === "dark"
                    ? "silver-glow bg-zinc-900"
                    : "neon-light bg-zinc-300/30"
                    }`}
            >
                <div
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 transform ${theme === "dark"
                        ? "translate-x-10 bg-zinc-800"
                        : "translate-x-1"
                        }`}
                >
                    {theme === "dark" ? (
                        <Moon
                            aria-hidden="true"
                            className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(0,180,255,0.9)]"
                        />
                    ) : (
                        <Sun
                            aria-hidden="true"
                            className="w-5 h-5 text-zinc-500 drop-shadow-[0_0_6px_rgba(255,200,0,0.9)]"
                        />
                    )}
                </div>
            </button>
        </div>
    );
}
