"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE = 'larvida_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

export async function login(email, senha) {
  const normalizedEmail = email?.trim().toLowerCase();
  const isValidUser = normalizedEmail === 'admin@email.com' && senha === 'admin';

  if (!isValidUser) {
    return { success: false, message: 'Usuário ou senha incorretos' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  redirect('/home');
}
