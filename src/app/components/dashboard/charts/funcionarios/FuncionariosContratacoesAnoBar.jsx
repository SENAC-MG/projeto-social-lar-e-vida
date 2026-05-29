"use client";

import { Chart } from "react-google-charts";

export default function FuncionariosContratacoesAnoBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="BarChart"
        data={dados}
        options={{
          title: "Histórico de Contratações",

          legend: {
            position: "bottom",
          },

          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
