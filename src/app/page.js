"use client";

import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { login } from "../../actions/login";
import fundo from "../../public/fundo.png";
import logo from "../../public/logo.png";
import Button from "@/shared/ui/Button";
import { InputField } from "@/shared/ui/Input";
import Link from "next/link";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberSession, setRememberSession] = useState(false);

    useEffect(() => {
        const savedRememberSession = localStorage.getItem("rememberSession");
        if (savedRememberSession === "true") {
            setRememberSession(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Favor Informar Usuário e Senha para Logar");
            return;
        }

        localStorage.setItem("rememberSession", rememberSession);

        const result = await login(email, password, rememberSession);

        if (!result?.success) {
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    };

    return (
        <main className="flex min-h-screen w-full font-sans">
            <div className="relative hidden w-[55%] lg:block">
                <Image
                    src={fundo}
                    alt="Fundo"
                    fill
                    placeholder="blur"
                    className="object-cover object-center blur-xs"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex flex-col p-16 text-white">
                    <div className="flex items-center gap-4">
                        <div className="relative h-18 w-18 rounded-full bg-white/10 flex p-2 backdrop-blur-md border border-white/20">
                            <Image src={logo} alt="Logo" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold leading-tight">Lar e Vida</h2>
                            <p className="text-sm text-zinc-300 font-medium uppercase tracking-wider">
                                Sistema de Gestão Hospitalar com Analytics Integrado
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-6 h-1.5 w-16 bg-[#5C7A53]" />

                        <h3 className="text-6xl font-serif font-medium leading-[1.1] mb-6 drop-shadow-lg">
                            Um futuro mais <br />
                            <span className="text-[#5C7A53] underline underline-offset-8">
                                organizado
                            </span>
                        </h3>

                        <p className="max-w-md text-xl text-gray-100 leading-relaxed drop-shadow-md text-justify">
                            O Lar e Vida é um sistema de gestão hospitalar desenvolvido para
                            otimizar o gerenciamento de doações, voluntariado e recursos, garantindo
                            que cada contribuição faça a maior diferença possível para nossos
                            residentes.
                        </p>
                    </div>
                    <div className="h-14" />
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center bg-white px-12 lg:w-[45%]">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <div className="mb-4 h-1.5 w-14 bg-[#5C7A53]" />

                        <h1 className="text-4xl font-bold text-gray-900">Bem-vindo</h1>

                        <p className="mt-2 text-gray-500">
                            Acesse sua conta para continuar cuidando de suas doações.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-3 top-[38px] h-4 w-4 text-gray-400" />

                            <InputField
                                id="email"
                                type="email"
                                label="E-mail"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="seu@gmail.com"
                                inputClassName="pl-9 pr-9 !text-black !border-[#5C7A53] bg-white focus:!border-[#5C7A53] focus:!ring-1 focus:!ring-[#5C7A53] placeholder:text-gray-600"
                                inputMode="email"
                                autoFocus
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-[38px] h-4 w-4 text-gray-400" />

                            <InputField
                                id="password"
                                type={showPassword ? "text" : "password"}
                                label="Senha"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="**********"
                                inputClassName="pl-9 pr-9 !text-black !border-[#5C7A53] bg-white focus:!border-[#5C7A53] focus:!ring-1 focus:!ring-[#5C7A53] placeholder:text-gray-600"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[36px] rounded p-1 text-gray-400 transition-colors hover:text-gray-600"
                                aria-label={showPassword ? "Ocultar" : "Mostrar"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberSession}
                                    onChange={(e) => setRememberSession(e.target.checked)}
                                    className="rounded border-gray-300 accent-[#5C7A53]"
                                />
                                Lembrar Sessão
                            </label>

                            <Link
                                href="/recuperar-senha"
                                className="font-medium text-[#5C7A53] transition-colors hover:text-[#5C7A53]/80"
                            >
                                Esqueci minha senha
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="cursor-pointer w-full rounded-xl py-3.5 !bg-[#5C7A53] hover:!bg-[#5C7A53]/70 text-white font-bold transition-all shadow-lg shadow-[#5C7A53]/20 active:scale-95"
                        >
                            Entrar no Sistema
                        </Button>
                    </form>

                    <div className="mt-12 rounded-2xl  p-6">
                        <p className="text-xs italic text-gray-500 leading-relaxed -mt-2 text-center">
                            <ShieldCheck className="inline-block mr-2 h-4 w-4" />
                            Conexão segura · JWT · Dados criptografados
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
