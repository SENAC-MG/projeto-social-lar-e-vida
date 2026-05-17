import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    if (!resolvedTheme) {
        return null
    }

    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={
                    isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                className={`relative flex items-center w-20 h-10 rounded-full transition-all duration-500 ${isDark
                    ? "bg-zinc-900"
                    : "bg-zinc-300/30"
                    }`}
            >
                <div
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 transform ${isDark
                        ? "translate-x-10 bg-zinc-800"
                        : "translate-x-1"
                        }`}
                >
                    {isDark ? (
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
