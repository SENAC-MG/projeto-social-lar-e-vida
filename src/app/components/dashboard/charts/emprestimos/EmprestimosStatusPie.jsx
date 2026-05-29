"use client";

import { Chart } from "react-google-charts";

export default function EmprestimosStatusPie({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="PieChart"
        data={dados}
        options={{
          title: "Empréstimos por Status",

          pieHole: 0.35,

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
