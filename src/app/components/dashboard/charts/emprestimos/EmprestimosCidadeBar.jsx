"use client";

import { Chart } from "react-google-charts";

export default function EmprestimosCidadeBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="ColumnChart"
        data={dados}
        options={{
          title: "Empréstimos por Cidade",

          legend: {
            position: "none",
          },

          backgroundColor: "transparent",

          hAxis: {
            title: "Cidade",
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
