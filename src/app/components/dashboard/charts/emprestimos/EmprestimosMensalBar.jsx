"use client";

import { Chart } from "react-google-charts";

export default function EmprestimosMensalBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="LineChart"
        data={dados}
        options={{
          title: "Evolução de Empréstimos",

          curveType: "function",

          legend: {
            position: "bottom",
          },

          backgroundColor: "transparent",

          hAxis: {
            title: "Mês",
          },

          vAxis: {
            title: "Quantidade",
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
