export function formatError(err) {
    // Log full error server-side for debugging
    console.error(err);

    const msg = err && err.message ? String(err.message) : "";

    // Preserve clear validation messages produced intentionally by the services
    if (
        msg.includes("Todos os campos") ||
        msg.includes("não encontrado") ||
        msg.startsWith("Campo \"") ||
        msg.startsWith("Violação de unicidade:")
    ) {
        return msg;
    }

    // Map some common database errors to friendly messages
    if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("already exists")) {
        return "Registro já existe.";
    }

    // Generic fallback for unexpected errors
    return "Ocorreu um erro. Verifique os dados e tente novamente.";
}
