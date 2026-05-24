import { SignJWT, jwtVerify } from 'jose';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET não configurado no .env');
  }

  return new TextEncoder().encode(secret);
}

export async function generateJwtToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getJwtSecret());
}

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload;
  } catch {
    return null;
  }
}