"use client";
import Image from "next/image";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../actions/login";
export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Favor Informar Usuário e Senha para Logar");
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            router.push("/dashboard");
        } else {
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    };

    return (
        <main className="flex min-h-screen w-full font-sans">
            <div className="relative hidden w-[55%] lg:block">
                <Image
                    src="/background.png"
                    alt="Background Lar e Vida"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                <div className="absolute inset-0 flex flex-col p-16 text-white">
                    <div className="flex items-center gap-4">
                        <div className="relative h-18 w-18 rounded-full bg-white/10 p-2 backdrop-blur-md border border-white/20">
                            <Image
                                src="/logo.png"
                                alt="Logo Lar e Vida"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Lar e Vida</h2>
                            <p className="text-sm text-[#F97316] uppercase">
                                Sistema de Gestão Hospitalar
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center bg-white px-12 lg:w-[45%]">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-6">Bem-vindo</h1>

                    {/* CORREÇÃO PRINCIPAL: FORM COM onSubmit */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 py-3 border"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 py-3 border"
                                />
                                <Eye className="absolute right-3 top-3" />
                            </div>
                        </div>

                        {/* BOTÃO AGORA É submit REAL */}
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3"
                        >
                            Entrar no Sistema
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
