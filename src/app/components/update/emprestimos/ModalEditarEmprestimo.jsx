"use client";

import { useState } from "react";
import { Save, Package } from "lucide-react";
import { toast } from "sonner";
import { updateEmprestimoAction } from "@modulos/emprestimos/controller/emprestimoController";

import Modal from "@/shared/ui/Modal";

export default function ModalEditarEmprestimo({ emprestimo, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);

    const inputClass =
        "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        if (emprestimo.materialId) {
            formData.append("materialId", emprestimo.materialId);
        }

        const res = await updateEmprestimoAction(emprestimo.id, formData);

        if (res.success) {
            toast.success(res.message || "Empréstimo atualizado com sucesso!");
            onSuccess?.();
            onClose();
        } else {
            toast.error(res.error || "Erro ao atualizar empréstimo.");
        }

        setLoading(false);
    }

    return (
        <Modal title="Editar Empréstimo" onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                className="bg-[#F7F9FC] dark:bg-background p-6 space-y-8 overflow-y-auto max-h-[85vh] custom-scrollbar"
            >
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Dados Pessoais
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            name="nome"
                            type="text"
                            defaultValue={emprestimo.nome}
                            placeholder="Nome"
                            className={`md:col-span-2 ${inputClass}`}
                        />

                        <input
                            name="cpf"
                            type="text"
                            defaultValue={emprestimo.cpf}
                            placeholder="CPF"
                            className={inputClass}
                        />

                        <input
                            name="rg"
                            type="text"
                            defaultValue={emprestimo.rg}
                            placeholder="RG"
                            className={inputClass}
                        />

                        <input
                            name="nascimento"
                            type="date"
                            defaultValue={formatDate(emprestimo.nascimento)}
                            className={inputClass}
                        />

                        <input
                            name="dataEmprestimo"
                            type="date"
                            defaultValue={formatDate(emprestimo.dataEmprestimo)}
                            className={inputClass}
                        />

                        <select
                            name="status"
                            defaultValue={emprestimo.status || "ativo"}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="ativo">Ativo</option>
                            <option value="devolvido">Devolvido</option>
                            <option value="atrasado">Atrasado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>

                        <input
                            name="previsaoDevolucao"
                            type="date"
                            defaultValue={formatDate(emprestimo.previsaoDevolucao)}
                            className={inputClass}
                        />

                        <input
                            name="dataDevolucao"
                            type="date"
                            defaultValue={formatDate(emprestimo.dataDevolucao)}
                            className={inputClass}
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Package size={14} />
                        Material Emprestado
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Material vinculado
                            </label>

                            <input
                                type="text"
                                value={emprestimo.material?.nome || "Nenhum material vinculado"}
                                disabled
                                className={`${inputClass} opacity-70 cursor-not-allowed`}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Quantidade
                            </label>

                            <input
                                name="quantidade"
                                type="number"
                                min="1"
                                defaultValue={emprestimo.quantidade || 1}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <textarea
                        name="materiaisEmprestados"
                        rows="3"
                        defaultValue={emprestimo.materiaisEmprestados}
                        placeholder="Observações sobre o material"
                        className={`${inputClass} resize-none min-h-[80px]`}
                    />

                    <p className="text-xs text-gray-500 mt-2">
                        Para registrar devolução e repor o estoque, altere o status para{" "}
                        <strong>Devolvido</strong>.
                    </p>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Endereço
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            name="rua"
                            type="text"
                            defaultValue={emprestimo.rua}
                            placeholder="Rua"
                            className={`md:col-span-2 ${inputClass}`}
                        />

                        <input
                            name="numero"
                            type="text"
                            defaultValue={emprestimo.numero}
                            placeholder="Número"
                            className={inputClass}
                        />

                        <input
                            name="cep"
                            type="text"
                            defaultValue={emprestimo.cep}
                            placeholder="CEP"
                            className={inputClass}
                        />

                        <input
                            name="bairro"
                            type="text"
                            defaultValue={emprestimo.bairro}
                            placeholder="Bairro"
                            className={`md:col-span-2 ${inputClass}`}
                        />

                        <input
                            name="cidade"
                            type="text"
                            defaultValue={emprestimo.cidade}
                            placeholder="Cidade"
                            className={`md:col-span-2 ${inputClass}`}
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Contato
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="telefone1"
                            type="text"
                            defaultValue={emprestimo.telefone1}
                            placeholder="Telefone 1"
                            className={inputClass}
                        />

                        <input
                            name="telefone2"
                            type="text"
                            defaultValue={emprestimo.telefone2}
                            placeholder="Telefone 2"
                            className={inputClass}
                        />
                    </div>
                </section>

                <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 !bg-[#5C7A53] hover:!bg-[#5C7A53] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#5C7A53]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />
                        {loading ? "Salvando..." : "Salvar alterações"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
