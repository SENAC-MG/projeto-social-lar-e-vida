"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE } from "@/features/auth/constants/auth-constants";

import {
    authenticate,
    isResetTokenValid,
} from "@/features/auth/services/auth-service";

import { generateJwtToken } from "@/features/auth/utils/jwt";
import { sanitizeEmail, sanitizeString } from "../../../../lib/sanitize";

export async function loginAction(email, senha, rememberSession = false) {
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedSenha = sanitizeString(senha);
    const result = await authenticate(sanitizedEmail, sanitizedSenha);

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
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: rememberSession
            ? 60 * 60 * 24 * 365 * 10 // 10 anos,
            : SESSION_MAX_AGE, // 1 dia
    });

    redirect("/home");
}

export async function validateResetTokenAction(token) {
    const isValid = await isResetTokenValid(token);
    return { valid: isValid };
}

export async function logoutAction() {
    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE);

    redirect("/");
}
