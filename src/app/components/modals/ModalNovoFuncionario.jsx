"use client";

import React, { useState } from "react";
import { Save, RotateCcw, User } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Funcionario } from "@modulos/funcionarios/controller/funcionarioController";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

export default function ModalNovoFuncionario({ onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);

    const inputClass =
        "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await cadastrar_Funcionario(formData);

        if (result.success) {
            toast.success(result.message || "Funcionário cadastrado com sucesso!");
            onSuccess?.();
            onClose();
        } else {
            toast.error(result.error || "Erro ao cadastrar funcionário.");
        }

        setLoading(false);
    }

    return (
        <Modal
            title="Novo Funcionário"
            onClose={onClose}
            headerClassName={"bg-[--card-bg]"}
        >
            <form
                onSubmit={handleSubmit}
                className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar bg-[--card-bg]"
            >
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <User size={14} /> Dados Pessoais
                    </h3>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-8 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Nome Completo <span className="text-primary">*</span>
                            </label>
                            <input
                                name="nome"
                                type="text"
                                required
                                placeholder="Nome Completo"
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
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="">Selecione...</option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="afastado">Afastado</option>
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Cargo <span className="text-primary">*</span>
                            </label>
                            <input
                                name="cargo"
                                type="text"
                                required
                                placeholder="Cargo"
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Data de Contratação <span className="text-primary">*</span>
                            </label>
                            <input
                                name="dataContratacao"
                                type="date"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Email <span className="text-primary">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="exemplo@email.com"
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Telefone <span className="text-primary">*</span>
                            </label>
                            <input
                                name="telefone"
                                type="text"
                                required
                                placeholder="Telefone"
                                className={inputClass}
                            />
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
