"use client";

import { Chart } from "react-google-charts";

export default function ServicosValorBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="ColumnChart"
        data={dados}
        options={{
          title: "Valor Total por Tipo de Serviço",
          legend: { position: "none" },
          backgroundColor: "transparent",
          hAxis: { title: "Tipo de Serviço" },
          vAxis: { title: "Valor Total (R$)" },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
