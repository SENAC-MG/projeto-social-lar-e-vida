"use server";

export async function login(email, senha) {
  console.log("Tentativa de login no servidor:", { email });
  if (email === "admin" && senha === "admin") {
    console.log("Usuário Autenticado com Sucesso");
    return { success: true, message: "Login bem-sucedido" };
  } else {
    return { success: false, message: "Usuário ou senha incorretos" };
  }
}
