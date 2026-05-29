"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PacientesSexoPie({ dados = [] }) {
  const entries = dados.slice(1);

  const data = {
    labels: entries.map((item) => item[0]),
    datasets: [
      {
        data: entries.map((item) => item[1]),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pacientes por Sexo",
        color: "#ffffff", // Mude para a cor que desejar
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff", // Cor do texto da legenda
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Pie data={data} options={options} />
    </div>
  );
}
