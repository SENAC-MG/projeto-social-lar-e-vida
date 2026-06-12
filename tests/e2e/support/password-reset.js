import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../src/features/auth/utils/password";
import { createPasswordResetTokenForTesting } from "../../../src/features/auth/services/auth-service";

export const resetUser = {
    email: process.env.E2E_RESET_USER_EMAIL || "reset-user@email.com",
    password: process.env.E2E_RESET_USER_PASSWORD || "Reset@12345",
};

export async function ensureResetUser() {
    const passwordHash = hashPassword(resetUser.password);

    await prisma.AuthUser.upsert({
        where: { email: resetUser.email },
        update: { passwordHash },
        create: {
            email: resetUser.email,
            passwordHash,
        },
    });
}

export async function createResetToken(email = resetUser.email) {
    return createPasswordResetTokenForTesting(email);
}
