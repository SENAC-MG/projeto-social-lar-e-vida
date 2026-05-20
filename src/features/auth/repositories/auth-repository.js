import { prisma } from '@/lib/prisma';

export async function findUserByEmail(email) {
  return prisma.AuthUser.findUnique({ where: { email } });
}

export async function upsertDefaultUser({ email, passwordHash }) {
  return prisma.AuthUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
}

export async function updateUserPassword(userId, passwordHash) {
  return prisma.AuthUser.update({
    where: { id: userId },
    data: { passwordHash },
  });
}

export async function createPasswordResetToken({ userId, tokenHash, expiresAt }) {
  return prisma.PasswordResetToken.create({
    data: { userId, tokenHash, expiresAt },
  });
}

export async function findValidPasswordResetToken(tokenHash) {
  const now = new Date();

  return prisma.PasswordResetToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: now },
    },
    include: {
      user: true,
    },
  });
}

export async function markPasswordResetTokenAsUsed(id) {
  return prisma.PasswordResetToken.update({
    where: { id },
    data: { usedAt: new Date() },
  });
}

export async function deleteExpiredPasswordResetTokens() {
  return prisma.PasswordResetToken.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        { usedAt: { not: null } },
      ],
    },
  });
}
