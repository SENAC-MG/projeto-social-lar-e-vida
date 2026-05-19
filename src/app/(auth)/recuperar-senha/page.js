"use client";

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { requestPasswordResetAction } from '@/features/auth/actions/auth-actions';
import Button from '@/shared/ui/Button';
import { InputField } from '@/shared/ui/Input';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.set('email', email);

    const result = await requestPasswordResetAction(formData);
    toast.success(result.message);

    setLoading(false);
  }

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md items-center px-6'>
      <div className='w-full rounded-2xl border border-card-border bg-card p-6 shadow-sm'>
        <h1 className='text-2xl font-bold text-foreground'>Recuperar senha</h1>
        <p className='mt-2 text-sm text-foreground/60'>
          Informe seu e-mail para receber instruções de redefinição.
        </p>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <div className='relative'>
            <Mail className='absolute left-3 top-[38px] h-4 w-4 text-foreground/40' />
            <InputField
              id='email'
              name='email'
              type='email'
              label='E-mail'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder='seu@email.com'
              inputClassName='pl-9'
              required
            />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar instruções'}
          </Button>
        </form>

        <Link href='/' className='mt-4 inline-flex text-sm font-medium text-primary hover:underline'>
          Voltar para login
        </Link>
      </div>
    </main>
  );
}
