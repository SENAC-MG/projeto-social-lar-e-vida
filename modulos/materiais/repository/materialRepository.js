import { prisma } from "@/lib/prisma";

export async function get_AllMateriais() {
  return await prisma.materiais.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      emprestimos: {
        where: {
          status: "ativo",
        },
      },
    },
  });
}

export async function findMaterialById(id) {
  return await prisma.materiais.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function post_Material(data) {
  return await prisma.materiais.create({
    data,
  });
}

export async function updateMaterial(id, data) {
  return await prisma.materiais.update({
    where: {
      id: Number(id),
    },
    data,
  });
}

export async function del_Material(id) {
  return await prisma.materiais.delete({
    where: {
      id: Number(id),
    },
  });
}