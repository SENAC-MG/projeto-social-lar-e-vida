"use client";

import { useState } from "react";
import { User } from "lucide-react";
import LogoutButton from "../LogoutButton";

export default function Header() {
    const [avatarError, setAvatarError] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="border-b border-zinc-800 mb-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-end">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="overflow-hidden rounded-full border border-gray-300 shadow-inner transition-all duration-200 hover:scale-105 dark:border-gray-600"
                        >
                            <span className="sr-only">Toggle dashboard menu</span>

                            {avatarError ? (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </div>
                            ) : (
                                <img
                                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                    src="/avatar.png"
                                    alt="Avatar"
                                    onError={() => setAvatarError(true)}
                                />
                            )}
                        </button>

                        <div
                            className={`absolute right-0 z-50 mt-3 w-56 transition-all duration-200 ease-out ${
                                dropdownOpen
                                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                            }`}
                            role="menu"
                        >
                            <div className="absolute -top-2 right-4 h-4 w-4 rotate-45 border-l border-t border-gray-200 dark:border-gray-700 bg-[#f2f2f2] dark:bg-zinc-900" />

                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#f2f2f2] shadow-xl dark:border-gray-700 dark:bg-zinc-900 backdrop-blur-sm">
                                <div className="p-2">
                                    <span
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-400 opacity-50 cursor-not-allowed transition-colors"
                                        aria-disabled="true"
                                    >
                                        Meu perfil
                                    </span>

                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
