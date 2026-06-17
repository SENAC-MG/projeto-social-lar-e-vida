"use client";

import { useState } from "react";
import { Save, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Emprestimo } from "@modulos/emprestimos/controller/emprestimoController";
import Modal from "@/shared/ui/Modal";
import { buscarPacientePorCpfAction } from "@/features/pacientes/actions/buscar-paciente-actions";

const initialFormData = {
    nome: "",
    cpf: "",
    rg: "",
    nascimento: "",
    dataEmprestimo: new Date().toISOString().split("T")[0],
    quantidade: 1,
    status: "ativo",
    previsaoDevolucao: "",
    dataDevolucao: "",
    materiaisEmprestados: "",
    rua: "",
    numero: "",
    cep: "",
    bairro: "",
    cidade: "",
    telefone1: "",
    telefone2: "",
};

export default function ModalNovoEmprestimo({ onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [buscandoPaciente, setBuscandoPaciente] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const inputClass =
        "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleBuscarPacientePorCpf() {
        if (!formData.cpf.trim()) {
            toast.warning("Informe o CPF antes de buscar.");
            return;
        }

        setBuscandoPaciente(true);

        const resultado = await buscarPacientePorCpfAction(formData.cpf);

        setBuscandoPaciente(false);

        if (!resultado.success) {
            toast.error(resultado.message || "Paciente não encontrado.");
            return;
        }

        const paciente = resultado.paciente;

        setFormData((prev) => ({
            ...prev,
            nome: paciente.nome || "",
            cpf: paciente.cpf || prev.cpf,
            rg: paciente.rg || "",
            nascimento: paciente.nascimento || "",
            rua: paciente.rua || "",
            numero: paciente.numero || "",
            cep: paciente.cep || "",
            bairro: paciente.bairro || "",
            cidade: paciente.cidade || "",
            telefone1: paciente.telefone1 || "",
            telefone2: paciente.telefone2 || "",
        }));

        toast.success("Paciente encontrado. Confira os dados antes de salvar.");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formPayload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value);
        });

        const result = await cadastrar_Emprestimo(formPayload);

        if (result.success) {
            toast.success(result.message || "Empréstimo cadastrado com sucesso!");
            onSuccess?.();
            onClose();
        } else {
            toast.error(result.error || "Erro ao cadastrar empréstimo.");
        }

        setLoading(false);
    }

    function handleReset() {
        setFormData(initialFormData);
    }

    return (
        <Modal title="Novo Empréstimo" onClose={onClose} headerClassName="bg-[--card-bg]">
            <form
                onSubmit={handleSubmit}
                className="bg-[--card-bg] p-6 space-y-8 overflow-y-auto max-h-[85vh] custom-scrollbar"
            >
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Dados Pessoais
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Nome <span className="text-primary">*</span>
                            </label>
                            <input
                                name="nome"
                                type="text"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome completo"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                CPF <span className="text-primary">*</span>
                            </label>

                            <div className="flex gap-2">
                                <input
                                    name="cpf"
                                    type="text"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                    placeholder="000.000.000-00"
                                    className={inputClass}
                                />

                                <button
                                    type="button"
                                    onClick={handleBuscarPacientePorCpf}
                                    disabled={buscandoPaciente}
                                    className="cursor-pointer flex items-center justify-center bg-[#5C7A53] text-white px-3 rounded-lg disabled:opacity-50"
                                    title="Buscar paciente por CPF"
                                >
                                    <Search size={18} />
                                </button>
                            </div>

                            {buscandoPaciente && (
                                <p className="text-xs text-gray-400 mt-1">Buscando paciente...</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                RG <span className="text-primary">*</span>
                            </label>
                            <input
                                name="rg"
                                type="text"
                                value={formData.rg}
                                onChange={handleChange}
                                required
                                placeholder="MG-00-000-00"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Nascimento <span className="text-primary">*</span>
                            </label>
                            <input
                                name="nascimento"
                                type="date"
                                value={formData.nascimento}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Data do Empréstimo <span className="text-primary">*</span>
                            </label>
                            <input
                                name="dataEmprestimo"
                                type="date"
                                value={formData.dataEmprestimo}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Quantidade <span className="text-primary">*</span>
                            </label>
                            <input
                                name="quantidade"
                                type="number"
                                min="1"
                                value={formData.quantidade}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Status <span className="text-primary">*</span>
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="ativo">Ativo</option>
                                <option value="devolvido">Devolvido</option>
                                <option value="atrasado">Atrasado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Previsão de Devolução
                            </label>
                            <input
                                name="previsaoDevolucao"
                                type="date"
                                value={formData.previsaoDevolucao}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                                Data de Devolução
                            </label>
                            <input
                                name="dataDevolucao"
                                type="date"
                                value={formData.dataDevolucao}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Materiais Emprestados <span className="text-primary">*</span>
                    </h3>

                    <textarea
                        name="materiaisEmprestados"
                        rows="3"
                        value={formData.materiaisEmprestados}
                        onChange={handleChange}
                        required
                        placeholder="Descreva os materiais"
                        className={`${inputClass} resize-none min-h-[80px]`}
                    />
                </section>

                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Endereço
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {["rua", "numero", "cep", "bairro", "cidade"].map((field) => (
                            <div
                                key={field}
                                className={
                                    field === "rua" || field === "bairro" || field === "cidade"
                                        ? "md:col-span-2"
                                        : ""
                                }
                            >
                                <label className="block text-gray-400 text-sm mb-1.5 font-medium capitalize">
                                    {field} <span className="text-primary">*</span>
                                </label>
                                <input
                                    name={field}
                                    type="text"
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        ))}
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
                            value={formData.telefone1}
                            onChange={handleChange}
                            required
                            placeholder="Telefone 1"
                            className={inputClass}
                        />

                        <input
                            name="telefone2"
                            type="text"
                            value={formData.telefone2}
                            onChange={handleChange}
                            required
                            placeholder="Telefone 2"
                            className={inputClass}
                        />
                    </div>
                </section>

                <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer flex items-center gap-2 bg-[#5C7A53] text-white px-8 py-2.5 rounded-lg font-bold disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? "Salvando..." : "Salvar"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="cursor-pointer flex items-center gap-2 bg-[#5B6B7C] text-white px-8 py-2.5 rounded-lg font-bold disabled:opacity-50"
                    >
                        <RotateCcw size={18} />
                        Limpar
                    </button>
                </div>
            </form>
        </Modal>
    );
}
