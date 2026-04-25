"use client";

export default function ModalNovoPaciente({ onClose, onSuccess }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Novo Paciente</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            &times;
          </button>
        </div>
        <form className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Nome <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  className="input-field"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Status <span className="text-[#F97316]">*</span>
                </label>
                <select className="input-field appearance-none bg-[#11141d]">
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Tipo de Câncer <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Selecione ou digite"
                  className="input-field"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  CPF <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  className="input-field"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  RG <span className="text-[#F97316]">*</span>
                </label>
                <input type="text" placeholder="RG" className="input-field" />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Nascimento <span className="text-[#F97316]">*</span>
                </label>
                <input type="date" className="input-field" />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">Profissão</label>
                <input
                  type="text"
                  placeholder="Ex: Professor"
                  className="input-field"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Data de Cadastro <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  value="24/04/2026"
                  readOnly
                  className="input-field bg-gray-800/20 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">
              Endereço
            </h3>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Rua <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Rua..."
                  className="input-field"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Número <span className="text-[#F97316]">*</span>
                </label>
                <input type="text" placeholder="Nº" className="input-field" />
              </div>
              <div className="col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  CEP <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="input-field"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Bairro <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bairro"
                  className="input-field"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Cidade <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Cidade"
                  className="input-field"
                />
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">
              Contato
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Telefone 1 <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Telefone 2</label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="input-field"
                />
              </div>
            </div>
          </section>

          {/* Footer Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] transition-all px-8 py-3 rounded-lg font-bold"
            >
              Salvar
            </button>
            <button
              type="reset"
              className="flex items-center gap-2 border border-gray-700 hover:bg-gray-800 transition-all px-8 py-3 rounded-lg font-bold text-gray-300"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
