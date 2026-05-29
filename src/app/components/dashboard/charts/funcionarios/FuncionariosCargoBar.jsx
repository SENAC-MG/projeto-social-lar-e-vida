"use client";

import { Chart } from "react-google-charts";

const CORES = ["#5C7A53", "#5B6B7C", "#94A3B8", "#3B82F6", "#F59E0B"];

export default function FuncionariosCargoBar({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="ColumnChart"
        data={dados}
        options={{
          title: "Funcionários por Cargo",

          colors: CORES,

          hAxis: {
            title: "Cargo",
          },

          vAxis: {
            title: "Quantidade",
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
