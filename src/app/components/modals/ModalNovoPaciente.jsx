"use client";

import { useState } from "react";
import { Save, RotateCcw, User, Phone, MapPin, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Paciente } from "@modulos/pacientes/controller/pacienteController";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

export default function ModalNovoPaciente({ onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const res = await cadastrar_Paciente(formData);

        if (res.success) {
            toast.success(res.message);
            onSuccess?.();
            onClose();
        } else {
            toast.error(res.error);
        }

        setLoading(false);
    }

    const inputClass =
        "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

    return (
        <Modal title="Novo Paciente" onClose={onClose} headerClassName={"bg-[--card-bg]"}>
            <form
                onSubmit={handleSubmit}
                className="bg-[--card-bg] p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
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
                                placeholder="Nome Completo"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                CPF <span className="text-primary">*</span>
                            </label>
                            <input
                                name="cpf"
                                type="text"
                                placeholder="000.000.000-00"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                RG <span className="text-primary">*</span>
                            </label>
                            <input
                                name="rg"
                                type="text"
                                placeholder="RG"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Sexo <span className="text-primary">*</span>
                            </label>
                            <select
                                name="sexo"
                                className={`${inputClass} appearance-none cursor-pointer`}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Nascimento <span className="text-primary">*</span>
                            </label>
                            <input name="nascimento" type="date" className={inputClass} required />
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Status <span className="text-primary">*</span>
                            </label>
                            <select
                                name="status"
                                className={`${inputClass} appearance-none cursor-pointer`}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="ativo">Ativo</option>
                                <option value="em tratamento">Em Tratamento</option>
                                <option value="alta">Alta</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Prioridade <span className="text-primary">*</span>
                            </label>
                            <select
                                name="prioridade"
                                className={`${inputClass} appearance-none cursor-pointer`}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                                <option value="urgente">Urgente</option>
                            </select>
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Profissão
                            </label>
                            <input
                                name="profissao"
                                type="text"
                                placeholder="Ex: Professor"
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Data de Cadastro
                            </label>
                            <input name="dataCadastro" type="date" className={inputClass} />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Stethoscope size={14} /> Informações Clínicas
                    </h3>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-foreground/70">
                                Tipo de Câncer *
                            </label>
                            <input
                                name="tipoCancer"
                                type="text"
                                placeholder="Ex: Neoplasia maligna do quadrante superior externo da mama"
                                className={inputClass}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-400">
                                CID Principal *
                            </label>
                            <textarea
                                name="CIDprincipal"
                                rows="2"
                                placeholder="Ex: C50.4"
                                className={`${inputClass} resize-none py-2 min-h-[60px]`}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-400">
                                CID Secundário / Observações
                            </label>
                            <textarea
                                name="CIDsecundario"
                                rows="2"
                                placeholder="Ex: C78.0"
                                className={`${inputClass} resize-none py-2 min-h-[60px]`}
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapPin size={14} /> Endereço
                    </h3>

                    <div className="grid grid-cols-12 gap-4">
                        <input
                            name="rua"
                            type="text"
                            placeholder="Rua"
                            className={`col-span-12 md:col-span-6 ${inputClass}`}
                        />
                        <input
                            name="numero"
                            type="text"
                            placeholder="Número"
                            className={`col-span-6 md:col-span-2 ${inputClass}`}
                        />
                        <input
                            name="cep"
                            type="text"
                            placeholder="CEP"
                            className={`col-span-6 md:col-span-4 ${inputClass}`}
                        />
                        <input
                            name="bairro"
                            type="text"
                            placeholder="Bairro"
                            className={`col-span-12 md:col-span-6 ${inputClass}`}
                        />
                        <input
                            name="cidade"
                            type="text"
                            placeholder="Cidade"
                            className={`col-span-12 md:col-span-6 ${inputClass}`}
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Phone size={14} /> Contato
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="telefone1"
                            type="text"
                            placeholder="Telefone 1"
                            className={inputClass}
                        />
                        <input
                            name="telefone2"
                            type="text"
                            placeholder="Telefone 2"
                            className={inputClass}
                        />
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
