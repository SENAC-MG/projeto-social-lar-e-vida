"use client";

import { Chart } from "react-google-charts";

export default function EmprestimosQuantidadeBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="BarChart"
        data={dados}
        options={{
          title: "Quantidade de Itens Emprestados",

          legend: {
            position: "none",
          },

          backgroundColor: "transparent",

          hAxis: {
            title: "Quantidade de Materiais",
          },

          vAxis: {
            title: "Status",
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
