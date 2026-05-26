'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/features/auth/constants/auth-constants';

import { authenticate } from '@/features/auth/services/auth-service';

import { generateJwtToken } from '@/features/auth/utils/jwt';

export async function loginAction(email, senha, rememberSession = false) {
  const result = await authenticate(email, senha);

  if (!result.success) {
    return result;
  }

  // cria JWT
  const token = await generateJwtToken({
    userId: result.userId,
  });

  const cookieStore = await cookies();

  // salva JWT no cookie
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: rememberSession
      ? 60 * 60 * 24 * 365 * 10 // 10 anos,
      : SESSION_MAX_AGE, // 1 dia
  });

  redirect('/home');
}

export async function requestPasswordResetAction(formData) {
  const email = formData.get('email')?.toString();
  return requestPasswordResetAction(email);
}

export async function validateResetTokenAction(token) {
  const isValid = await isResetTokenValid(token);
  return { valid: isValid };
}

export async function resetPasswordAction(formData) {
  const token = formData.get('token')?.toString();
  const newPassword = formData.get('newPassword')?.toString();

  try {
    await resetPassword(token, newPassword);
    return {
      success: true,
      message: 'Senha redefinida com sucesso. Faça login com sua nova senha.',
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || 'Não foi possível redefinir a senha.',
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);

  redirect('/');
}