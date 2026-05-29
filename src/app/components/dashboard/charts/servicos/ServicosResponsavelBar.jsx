"use client";

import { Chart } from "react-google-charts";

export default function ServicosResponsavelBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="BarChart"
        data={dados}
        options={{
          title: "Serviços por Responsável",
          legend: { position: "none" },
          backgroundColor: "transparent",
          hAxis: { title: "Quantidade" },
          vAxis: { title: "Funcionário" },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
  