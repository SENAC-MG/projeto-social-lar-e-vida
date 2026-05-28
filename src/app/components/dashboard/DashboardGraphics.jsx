"use client";

import ChartSection from "./charts/ChartSection";

import PacientesStatusPie from "./charts/pacientes/PacientesStatusPie";
import PacientesSexoPie from "./charts/pacientes/PacientesSexoPie";
import PacientesPrioridadeBar from "./charts/pacientes/PacientesPrioridadeBar";
import PacientesCancerBar from "./charts/pacientes/PacientesCancerBar";

export default function DashboardGraphics({ graficos }) {
  return (
    <div className="mt-8 space-y-6 text-2xl">
      <ChartSection titulo="Gráficos de Pacientes">
        <PacientesStatusPie dados={graficos.pacientes.status} />
        <PacientesSexoPie dados={graficos.pacientes.sexo} />
        <PacientesPrioridadeBar dados={graficos.pacientes.prioridade} />
        <PacientesCancerBar dados={graficos.pacientes.cancer} />
      </ChartSection>
    </div>
  );
}
