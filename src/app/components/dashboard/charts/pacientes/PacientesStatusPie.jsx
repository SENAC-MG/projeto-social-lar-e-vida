"use client";

import { Chart } from "react-google-charts";

export default function PacientesStatusPie({ dados }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Chart
        chartType="PieChart"
        data={dados}
        options={{
          title: "Pacientes por Status",
          titleTextStyle: {
            color: "#ffffff",
            fontSize: 16,
            bold: true,
          },
          pieHole: 0.35,
          legend: {
            position: "bottom",
            textStyle: {
              color: "#ffffff", // Cor do texto da legenda
              fontSize: 12,
            },
          },
          pieSliceTextStyle: {
            color: "#ffffff", // Cor do texto nas fatias do gráfico
            fontSize: 12,
          },
          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
}
