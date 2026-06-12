import crypto from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(":")) return false;

    const [salt, expectedHash] = storedHash.split(":");
    const calculatedHash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");

    const expectedBuffer = Buffer.from(expectedHash, "hex");
    const calculatedBuffer = Buffer.from(calculatedHash, "hex");

    if (expectedBuffer.length !== calculatedBuffer.length) return false;

    return crypto.timingSafeEqual(expectedBuffer, calculatedBuffer);
}
