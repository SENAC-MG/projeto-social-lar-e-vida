const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
    return email?.toString().trim().toLowerCase() || "";
}

export function isValidEmail(email) {
    return EMAIL_REGEX.test(normalizeEmail(email));
}

export function validateResetPassword(password) {
    if (!password || password.length < 8) {
        throw new Error("A nova senha deve ter ao menos 8 caracteres.");
    }
}
