"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import LogoutButton from "../LogoutButton";

export default function Header() {
    const [avatarError, setAvatarError] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="border-b border-zinc-300 dark:border-gray-700 mb-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-end">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
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

                        {dropdownOpen && (
                            <div
                                className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
                                role="menu"
                            >
                                <div className="p-2">
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 pointer-events-none"
                                        role="menuitem"
                                    >
                                        Meu perfil
                                    </a>

                                    <LogoutButton />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
