"use client";

import { useState } from "react";
import { Save, RotateCcw, Package } from "lucide-react";
import { toast } from "sonner";

import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";
import { updateMaterialAction } from "@modulos/materiais/controller/materialController";

export default function ModalEditarMaterial({ material, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);

    const inputClass =
        "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const res = await updateMaterialAction(material.id, formData);

        if (res.success) {
            toast.success(res.message || "Material atualizado com sucesso!");
            onSuccess?.();
            onClose();
        } else {
            toast.error(res.error || "Erro ao atualizar material.");
        }

        setLoading(false);
    }

    return (
        <Modal title="Editar Material" onClose={onClose} headerClassName="bg-[--card-bg]">
            <form
                onSubmit={handleSubmit}
                className="bg-[--card-bg] p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Package size={14} />
                        Dados do Material
                    </h3>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Nome <span className="text-primary">*</span>
                            </label>
                            <input
                                name="nome"
                                type="text"
                                required
                                defaultValue={material.nome || ""}
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Descrição
                            </label>
                            <textarea
                                name="descricao"
                                rows="3"
                                defaultValue={material.descricao || ""}
                                className={`${inputClass} resize-none min-h-[90px]`}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Quantidade Total <span className="text-primary">*</span>
                            </label>
                            <input
                                name="quantidadeTotal"
                                type="number"
                                min="0"
                                required
                                defaultValue={material.quantidadeTotal ?? 0}
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Quantidade Disponível <span className="text-primary">*</span>
                            </label>
                            <input
                                name="quantidadeAtual"
                                type="number"
                                min="0"
                                required
                                defaultValue={material.quantidadeAtual ?? 0}
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Status <span className="text-primary">*</span>
                            </label>
                            <select
                                name="status"
                                required
                                defaultValue={material.status || "ativo"}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                </section>

                <div className="flex items-center gap-4 pt-4 border-t border-card-border">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-8 !bg-[#5C7A53] hover:!bg-[#5C7A53] cursor-pointer"
                    >
                        <Save size={18} />
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>

                    <Button
                        type="reset"
                        variant="secondary"
                        disabled={loading}
                        className="px-8 hover:!bg-[#5B6B7C] cursor-pointer"
                    >
                        <RotateCcw size={18} />
                        Limpar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
