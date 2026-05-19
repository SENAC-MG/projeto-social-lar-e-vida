"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { login } from '../../actions/login';
import Button from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/Input';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Favor Informar Usuário e Senha para Logar');
      return;
    }

    const result = await login(email, password);

    if (!result?.success) {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <main className='flex min-h-screen w-full font-sans'>
      <div className='relative hidden w-[55%] lg:block'>
        <Image
          src='/background.png'
          alt='Background Lar e Vida'
          fill
          priority
          className='object-cover'
        />

        <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50' />

        <div className='absolute inset-0 flex flex-col p-16 text-white'>
          <div className='flex items-center gap-4'>
            <div className='relative h-18 w-18 rounded-full bg-white/10 flex p-2 backdrop-blur-md border border-white/20'>
              <Image src='/logo.png' alt='Logo Lar e Vida' fill className='object-contain p-0' />
            </div>
            <div>
              <h2 className='text-xl font-bold leading-tight'>Lar e Vida</h2>
              <p className='text-sm text-[#F97316] font-medium uppercase tracking-wider'>
                Sistema de Gestão Hospitalar com Analytics Integrado
              </p>
            </div>
          </div>

          <div className='flex-1 flex flex-col justify-center'>
            <div className='mb-6 h-1.5 w-16 bg-[#F97316]' />
            <h3 className='text-6xl font-serif font-medium leading-[1.1] mb-6 drop-shadow-lg'>
              Um futuro mais <br />
              <span className='text-[#F97316]'>organizado</span>
            </h3>
            <p className='max-w-md text-xl text-gray-100 leading-relaxed drop-shadow-md'>
              O Lar e Vida é um sistema de gestão hospitalar desenvolvido para otimizar o
              gerenciamento de doações, voluntariado e recursos, garantindo que cada
              contribuição faça a maior diferença possível para nossos residentes.
            </p>
          </div>

          <div className='h-14' />
        </div>
      </div>

      <div className='flex w-full flex-col items-center justify-center bg-white px-12 lg:w-[45%]'>
        <div className='w-full max-w-md'>
          <div className='mb-10'>
            <div className='mb-4 h-1.5 w-14 bg-[#F97316]' />
            <h1 className='text-4xl font-bold text-gray-900'>Bem-vindo</h1>
            <p className='mt-2 text-gray-500'>
              Acesse sua conta para continuar cuidando de suas doações.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='relative'>
              <Mail className='absolute left-3 top-[38px] h-4 w-4 text-gray-400' />
              <InputField
                id='email'
                type='email'
                label='E-mail'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='seu@gmail.com'
                inputClassName='pl-9 text-gray-700 border-gray-300 bg-white'
                inputMode='email'
                autoFocus
              />
            </div>

            <div className='relative'>
              <Lock className='absolute left-3 top-[38px] h-4 w-4 text-gray-400' />
              <InputField
                id='password'
                type={showPassword ? 'text' : 'password'}
                label='Senha'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='**********'
                inputClassName='pl-9 pr-9 text-gray-700 border-gray-300 bg-white'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-[36px] rounded p-1 text-gray-400 transition-colors hover:text-gray-600'
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2 text-gray-500 cursor-pointer'>
                <input type='checkbox' className='rounded border-gray-300 accent-[#F97316]' />
                Lembrar-me
              </label>

              <Link
                href='/recuperar-senha'
                className='font-medium text-[#F97316] transition-colors hover:text-[#ea580c]'
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button type='submit' className='w-full rounded-xl py-3.5'>
              Entrar no Sistema
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
