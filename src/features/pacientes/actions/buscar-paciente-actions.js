"use server";

import { prisma } from "../../../../lib/prisma";

function limparCpf(cpf) {
  return String(cpf || "").replace(/\D/g, "");
}

export async function buscarPacientePorCpfAction(cpf) {
  try {
    const cpfLimpo = limparCpf(cpf);

    if (cpfLimpo.length !== 11) {
      return {
        success: false,
        message: "CPF inválido.",
      };
    }

    const paciente = await prisma.pacientes.findUnique({
      where: {
        cpf: cpfLimpo,
      },
      select: {
        nome: true,
        cpf: true,
        rg: true,
        nascimento: true,
        rua: true,
        numero: true,
        cep: true,
        bairro: true,
        cidade: true,
        telefone1: true,
        telefone2: true,
      },
    });

    if (!paciente) {
      return {
        success: false,
        message: "Paciente não encontrado.",
      };
    }

    return {
      success: true,
      paciente: {
        ...paciente,
        nascimento: paciente.nascimento
          ? paciente.nascimento.toISOString().split("T")[0]
          : "",
      },
    };
  } catch {
    return {
      success: false,
      message: "Erro ao buscar paciente.",
    };
  }
}