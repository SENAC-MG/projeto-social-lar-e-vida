"use server";

import { put } from "@vercel/blob";
import { redimensionar } from "./redimensionar";

export async function uploadFotoPacienteAction(arquivo) {
  if (!arquivo || arquivo.size === 0) {
    return null;
  }

  const tiposPermitidos = ["image/png", "image/jpeg", "image/webp"];

  if (!tiposPermitidos.includes(arquivo.type)) {
    throw new Error("A foto precisa ser PNG, JPG ou WEBP.");
  }

  const TAMANHO_MAXIMO = 4.5 * 1024 * 1024;

  if (arquivo.size > TAMANHO_MAXIMO) {
    throw new Error("A imagem deve ter no máximo 4,5 MB.");
  }

  const imagemPng = await redimensionar(arquivo);

  const blob = await put("pacientes/foto.png", imagemPng, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/png",
  });

  return blob.url;
}