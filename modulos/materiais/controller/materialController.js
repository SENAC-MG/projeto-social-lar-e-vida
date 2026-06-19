"use server";

import {
  apaga_Material,
  gravarMaterial,
  pegar_Materiais,
  updateMaterialService,
} from "../services/materialService";

import { formatError } from "../../../lib/formatError";
import { sanitizeString, sanitizeOptionalString } from "../../../lib/sanitize";

export async function get_Materiais() {
  const dados = await pegar_Materiais();
  return dados;
}

export async function cadastrar_Material(formData) {
  const nome = sanitizeString(formData.get("nome"));
  const descricao = sanitizeOptionalString(formData.get("descricao"));
  const quantidadeTotal = formData.get("quantidadeTotal");
  const quantidadeAtual = formData.get("quantidadeAtual");
  const status = sanitizeOptionalString(formData.get("status")) || "ativo";

  try {
    await gravarMaterial(nome, descricao, quantidadeTotal, quantidadeAtual, status);

    return {
      success: true,
      message: "Material cadastrado com sucesso!",
    };
  } catch (err) {
    return {
      success: false,
      error: formatError(err),
    };
  }
}

export async function deletar_Material(id) {
  try {
    await apaga_Material(id);

    return {
      success: true,
      message: "Material deletado com sucesso!",
    };
  } catch (err) {
    return {
      success: false,
      error: formatError(err),
    };
  }
}

export async function updateMaterialAction(id, formData) {
  const data = {};

  const nome = sanitizeString(formData.get("nome"));
  const descricao = sanitizeOptionalString(formData.get("descricao"));
  const quantidadeTotal = formData.get("quantidadeTotal");
  const quantidadeAtual = formData.get("quantidadeAtual");
  const status = sanitizeOptionalString(formData.get("status"));

  if (nome) data.nome = nome;
  if (descricao !== undefined) data.descricao = descricao;
  if (quantidadeTotal !== null && quantidadeTotal !== "") data.quantidadeTotal = quantidadeTotal;
  if (quantidadeAtual !== null && quantidadeAtual !== "") data.quantidadeAtual = quantidadeAtual;
  if (status) data.status = status;

  try {
    const materialAtualizado = await updateMaterialService(id, data);

    return {
      success: true,
      message: "Material atualizado com sucesso!",
      material: materialAtualizado,
    };
  } catch (err) {
    return {
      success: false,
      error: formatError(err),
    };
  }
}