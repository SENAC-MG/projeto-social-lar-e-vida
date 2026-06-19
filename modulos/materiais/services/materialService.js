"use server";

import {
  del_Material,
  findMaterialById,
  get_AllMateriais,
  post_Material,
  updateMaterial,
} from "../repository/materialRepository";

import {
  validateRequiredString,
  validateOptionalString,
} from "../../../lib/payloadValidation";

export async function pegar_Materiais() {
  return await get_AllMateriais();
}

export async function gravarMaterial(nome, descricao, quantidadeTotal, quantidadeAtual, status) {
  const nomeValid = validateRequiredString(nome, "nome");
  const descricaoValid = validateOptionalString(descricao, "descricao");

  const quantidadeTotalValid = Number(quantidadeTotal);
  const quantidadeAtualValid = Number(quantidadeAtual);
  const statusValid = validateRequiredString(status || "ativo", "status");

  if (Number.isNaN(quantidadeTotalValid) || quantidadeTotalValid < 0) {
    throw new Error("Quantidade total inválida.");
  }

  if (Number.isNaN(quantidadeAtualValid) || quantidadeAtualValid < 0) {
    throw new Error("Quantidade disponível inválida.");
  }

  if (quantidadeAtualValid > quantidadeTotalValid) {
    throw new Error("A quantidade disponível não pode ser maior que a quantidade total.");
  }

  return await post_Material({
    nome: nomeValid,
    descricao: descricaoValid || "",
    quantidadeTotal: quantidadeTotalValid,
    quantidadeAtual: quantidadeAtualValid,
    status: statusValid,
  });
}

export async function apaga_Material(id) {
  const material = await findMaterialById(Number(id));

  if (!material) {
    throw new Error("Material não encontrado.");
  }

  return await del_Material(Number(id));
}

export async function updateMaterialService(id, data) {
  const material = await findMaterialById(Number(id));

  if (!material) {
    throw new Error("Material não encontrado para atualizar.");
  }

  if (data.nome !== undefined) {
    data.nome = validateRequiredString(data.nome, "nome");
  }

  if (data.descricao !== undefined) {
    data.descricao = validateOptionalString(data.descricao, "descricao");
  }

  if (data.status !== undefined) {
    data.status = validateRequiredString(data.status, "status");
  }

  if (data.quantidadeTotal !== undefined) {
    data.quantidadeTotal = Number(data.quantidadeTotal);

    if (Number.isNaN(data.quantidadeTotal) || data.quantidadeTotal < 0) {
      throw new Error("Quantidade total inválida.");
    }
  }

  if (data.quantidadeAtual !== undefined) {
    data.quantidadeAtual = Number(data.quantidadeAtual);

    if (Number.isNaN(data.quantidadeAtual) || data.quantidadeAtual < 0) {
      throw new Error("Quantidade disponível inválida.");
    }
  }

  if (
    data.quantidadeTotal !== undefined &&
    data.quantidadeAtual !== undefined &&
    data.quantidadeAtual > data.quantidadeTotal
  ) {
    throw new Error("A quantidade disponível não pode ser maior que a quantidade total.");
  }

  return await updateMaterial(Number(id), data);
}