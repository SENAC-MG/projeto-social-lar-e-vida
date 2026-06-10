"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function PacientesPrioridadeBar({ dados }) {
  const { chartOptions } = useChartTheme();

  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="ColumnChart"
        data={dados}
        options={{
          ...chartOptions,
          title: "Pacientes por Prioridade",
          hAxis: {
            ...chartOptions.hAxis,
            title: "Prioridade",
          },
          vAxis: {
            ...chartOptions.vAxis,
            title: "Quantidade de Pacientes",
          },
          legend: {
            position: "none",
          },
          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
