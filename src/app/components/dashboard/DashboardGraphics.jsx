"use client";

import ChartSection from "./charts/ChartSection";

import PacientesStatusPie from "./charts/pacientes/PacientesStatusPie";
import PacientesSexoPie from "./charts/pacientes/PacientesSexoPie";
import PacientesPrioridadeBar from "./charts/pacientes/PacientesPrioridadeBar";
import PacientesCancerBar from "./charts/pacientes/PacientesCancerBar";
import ServicosStatusPie from "./charts/servicos/ServicosStatusPie";
import ServicosResponsavelBar from "./charts/servicos/ServicosResponsavelBar";
import ServicosTipoBar from "./charts/servicos/ServicosTipoBar";
import ServicosValorBar from "./charts/servicos/ServicosValorBar";
import FuncionariosCargoBar from "./charts/funcionarios/FuncionariosCargoBar";
import FuncionariosContratacoesAnoBar from "./charts/funcionarios/FuncionariosContratacoesAnoBar";
import FuncionariosContratacoesBar from "./charts/funcionarios/FuncionariosContratacoesBar";
import FuncionariosStatusPie from "./charts/funcionarios/FuncionariosStatusPie";
import EmprestimosCidadeBar from "./charts/emprestimos/EmprestimosCidadeBar";
import EmprestimosMensalBar from "./charts/emprestimos/EmprestimosMensalBar";
import EmprestimosQuantidadeBar from "./charts/emprestimos/EmprestimosQuantidadeBar";
import EmprestimosStatusPie from "./charts/emprestimos/EmprestimosStatusPie";
export default function DashboardGraphics({ graficos }) {
  return (
    <div className="mt-8 space-y-6 text-2xl">
      <ChartSection titulo="Gráficos de Funcionários">
        <FuncionariosStatusPie dados={graficos?.funcionarios?.status} />
        <FuncionariosCargoBar dados={graficos?.funcionarios?.cargo} />
        <FuncionariosContratacoesBar
          dados={graficos?.funcionarios?.contratacoesMes}
        />
        <FuncionariosContratacoesAnoBar
          dados={graficos?.funcionarios?.contratacoesAno}
        />
      </ChartSection>
      <ChartSection titulo="Gráficos de Pacientes">
        <PacientesStatusPie dados={graficos.pacientes.status} />
        <PacientesSexoPie dados={graficos.pacientes.sexo} />
        <PacientesPrioridadeBar dados={graficos.pacientes.prioridade} />
        <PacientesCancerBar dados={graficos.pacientes.cancer} />
      </ChartSection>
      <ChartSection titulo="Gráficos de Empréstimos">
        <EmprestimosStatusPie dados={graficos?.emprestimos?.status} />

        <EmprestimosCidadeBar dados={graficos?.emprestimos?.cidade} />

        <EmprestimosMensalBar dados={graficos?.emprestimos?.mensal} />

        <EmprestimosQuantidadeBar dados={graficos?.emprestimos?.quantidade} />
      </ChartSection>
      <ChartSection titulo="Gráficos de Serviços">
        <ServicosStatusPie dados={graficos?.servicos?.status} />
        <ServicosTipoBar dados={graficos?.servicos?.tipo} />
        <ServicosResponsavelBar dados={graficos?.servicos?.responsavel} />
        <ServicosValorBar dados={graficos?.servicos?.valorPorTipo} />
      </ChartSection>
    </div>
  );
}
