'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/features/auth/constants/auth-constants';
import {
  authenticate,
  isResetTokenValid,
  requestPasswordReset,
  resetPassword,
} from '@/features/auth/services/auth-service';

export async function loginAction(email, senha) {
  const result = await authenticate(email, senha);

  if (!result.success) {
    return result;
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, String(result.userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  redirect('/home');
}

export async function requestPasswordResetAction(formData) {
  const email = formData.get('email')?.toString();
  return requestPasswordReset(email);
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
