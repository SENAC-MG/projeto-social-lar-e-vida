"use server";

import { prisma } from "@/lib/prisma";
import {
    createPasswordResetToken,
    deleteExpiredPasswordResetTokens,
    findUserByEmail,
    findValidPasswordResetToken,
    markPasswordResetTokenAsUsed,
    updateUserPassword,
    upsertDefaultUser,
} from "@/features/auth/repositories/auth-repository";
import {
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD,
    RESET_TOKEN_TTL_MINUTES,
} from "@/features/auth/constants/auth-constants";
import { hashPassword, verifyPassword } from "@/features/auth/utils/password";
import { generateResetToken, hashResetToken } from "@/features/auth/utils/token";
import {
    isValidEmail,
    normalizeEmail,
    validateResetPassword,
} from "@/features/auth/validations/auth-validation";

async function ensureDefaultAdminUser() {
    const email = normalizeEmail(process.env.DEFAULT_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL);
    const password = process.env.DEFAULT_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    if (!isValidEmail(email) || !password) return;

    const existing = await findUserByEmail(email);

    if (!existing) {
        await upsertDefaultUser({ email, passwordHash: hashPassword(password) });
    }
}

export async function authenticate(email, password) {
    await ensureDefaultAdminUser();

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail) || !password) {
        return { success: false, message: "Usuário ou senha incorretos." };
    }

    const user = await findUserByEmail(normalizedEmail);

    if (!user || !verifyPassword(password, user.passwordHash)) {
        return { success: false, message: "Usuário ou senha incorretos." };
    }

    return { success: true, userId: user.id };
}

export async function requestPasswordReset(email) {
    await ensureDefaultAdminUser();
    await deleteExpiredPasswordResetTokens();

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
        return {
            success: true,
            message:
                "Se o e-mail estiver cadastrado, você receberá instruções para redefinição de senha.",
        };
    }

    const user = await findUserByEmail(normalizedEmail);

    if (user) {
        const token = generateResetToken();
        const tokenHash = hashResetToken(token);
        const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

        await createPasswordResetToken({
            userId: user.id,
            tokenHash,
            expiresAt,
        });

        console.info(
            `[Auth] Token de recuperação para ${normalizedEmail}: /redefinir-senha?token=${token}`
        );
    }

    return {
        success: true,
        message:
            "Se o e-mail estiver cadastrado, você receberá instruções para redefinição de senha.",
    };
}

export async function createPasswordResetTokenForTesting(email) {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Função disponível apenas em ambiente de teste.");
    }

    await ensureDefaultAdminUser();
    const normalizedEmail = normalizeEmail(email);
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
        throw new Error("Usuário não encontrado para teste de recuperação.");
    }

    const token = generateResetToken();
    const tokenHash = hashResetToken(token);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

    await createPasswordResetToken({
        userId: user.id,
        tokenHash,
        expiresAt,
    });

    return token;
}

export async function isResetTokenValid(token) {
    if (!token) return false;

    const tokenHash = hashResetToken(token);
    const resetToken = await findValidPasswordResetToken(tokenHash);

    return Boolean(resetToken);
}

export async function resetPassword(token, newPassword) {
    validateResetPassword(newPassword);

    if (!token) {
        throw new Error("Token de redefinição inválido.");
    }

    const tokenHash = hashResetToken(token);
    const resetToken = await findValidPasswordResetToken(tokenHash);

    if (!resetToken) {
        throw new Error("Token inválido ou expirado. Solicite uma nova recuperação.");
    }

    const passwordHash = hashPassword(newPassword);

    await prisma.$transaction([
        updateUserPassword(resetToken.user.id, passwordHash),
        markPasswordResetTokenAsUsed(resetToken.id),
    ]);

    return { success: true };
}
