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
      router.push("/home");
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
            <div className="relative h-18 w-18 rounded-full bg-white/10 flex p-2 backdrop-blur-md border border-white/20">
              <Image
                src="/logo.png"
                alt="Logo Lar e Vida"
                fill
                className="object-contain p-0"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">Lar e Vida</h2>
              <p className="text-sm text-[#F97316] font-medium uppercase tracking-wider">
                Sistema de Gestão Hospitalar com Analytics Integrado
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6 h-1.5 w-16 bg-[#F97316]" />
            <h3 className="text-6xl font-serif font-medium leading-[1.1] mb-6 drop-shadow-lg">
              Um futuro mais <br />
              <span className="text-[#F97316]">organizado</span>
            </h3>
            <p className="max-w-md text-xl text-gray-100 leading-relaxed drop-shadow-md">
              O Lar e Vida é um sistema de gestão hospitalar desenvolvido para
              otimizar o gerenciamento de doações, voluntariado e recursos,
              garantindo que cada contribuição faça a maior diferença possível
              para nossos residentes.
            </p>
          </div>

          <div className="h-14" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white px-12 lg:w-[45%]">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="mb-4 h-1.5 w-14 bg-[#F97316]" />
            <h1 className="text-4xl font-bold text-gray-900">Bem-vindo</h1>
            <p className="mt-2 text-gray-500">
              Acesse sua conta para continuar cuidando de suas doações.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@gmail.com"
                  className="w-full text-black rounded-xl border border-gray-300 py-3.5 pl-12 pr-4 outline-none focus:border-[#F97316] transition-all"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  className="w-full text-black rounded-xl border border-gray-300 py-3.5 pl-12 pr-12 outline-none focus:border-[#F97316] transition-all"
                />
                <Eye className="absolute right-4 h-5 w-5 text-gray-400 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 accent-[#F97316]"
                />
                Lembrar-me
              </label>
              <a
                href="#"
                className="text-[#F97316] font-medium hover:underline"
              >
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#F97316] py-4 font-bold text-white shadow-lg shadow-orange-200 hover:bg-[#ea580c] transition-all"
            >
              Entrar no Sistema
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Precisa de ajuda?{" "}
            <a href="#" className="text-[#F97316] font-bold">
              Fale com o suporte
            </a>
          </p>

          <div className="mt-12 rounded-2xl bg-gray-50 p-6 border border-gray-100">
            <span className="text-4xl text-[#F97316] font-serif font-bold italic">
              “
            </span>
            <p className="text-xs italic text-gray-500 leading-relaxed -mt-2">
              O sistema mudou completamente a forma como gerenciamos nossas
              doações. Tudo ficou mais organizado e a ajuda a nossos residentes
              aumentou.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden relative"></div>
              <div>
                <p className="text-xs font-bold text-gray-900">Carlos</p>
                <p className="text-[10px] text-gray-400">
                  Diretor - Lar e Vida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
