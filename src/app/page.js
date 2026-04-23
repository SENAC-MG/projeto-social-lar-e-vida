import Image from "next/image";
import { Mail, Lock } from "lucide-react";
export default function Home() {
  return (
    <main className="flex min-h-screen w-full font-sans">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/imglogin.png"
          alt="Background Casa do Vovô"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-25 bottom-0 top-0 right-0 p-6">
          <Image
            src={"/logoLareVida.png"}
            alt="Logo Lar e Vida"
            width={80}
            height={10}
          />
          <h2 className="text-xl font-bold text-white">Lar e Vida</h2>
          <p className="text-gray-300">
            Cuidando de cada história com amor, <br /> respeito e a dedicação
            que a vida merece.
          </p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-8 lg:w-1/2 xl:px-24">
        {/* O max-w-md aqui agora controla a largura de tudo dentro dele */}
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-4 h-1 w-12 bg-[#F97316]" />
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              Bem-vindo
            </h1>
            <p className="mt-2 text-gray-500">
              Acesse sua conta para continuar cuidando de suas doações.
            </p>
          </div>

          <form className="space-y-6">
            {/* E-mail */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="seu@gmail.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-600 outline-none transition-all focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-600 outline-none transition-all focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                />
              </div>
            </div>

            {/* Botão agora alinhado */}
            <button className="w-full rounded-lg bg-[#F97316] py-3 font-bold text-white transition-colors hover:bg-[#ea580c] shadow-lg shadow-orange-200">
              Entrar no Sistema
            </button>
          </form>

          {/* Depoimento */}
          <div className="mt-12 rounded-xl bg-gray-50 p-6 border border-gray-100">
            <span className="text-4xl text-[#F97316] font-serif">"</span>
            <p className="text-sm italic text-gray-600 -mt-4">
              O sistema mudou completamente a forma como gerenciamos nossas
              doações. Tudo ficou mais organizado e a ajuda a nossos residentes
              aumentou.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                {/* Aqui você pode colocar a foto do Carlos dps */}
              </div>
              <div>
                <p className="text-xs font-bold text-black">Carlos</p>
                <p className="text-[10px] text-gray-500">
                  Diretor - Casa do Vovô
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
