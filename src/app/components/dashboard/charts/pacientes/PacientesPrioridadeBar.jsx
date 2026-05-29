"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function PacientesPrioridadeBar({ dados = [] }) {
  const entries = dados.slice(1);

  const data = {
    labels: entries.map((item) => item[0]),
    datasets: [
      {
        label: "Pacientes",
        data: entries.map((item) => item[1]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pacientes por Prioridade",
        color: "#ffffff", // Mude para a cor que desejar
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          color: "#ffffff", // Cor do eixo X
        },
        ticks: {
          color: "#ffffff", // Cor dos textos das categorias
        },
      },
      y: {
        title: {
          display: true,
          color: "#ffffff", // Cor do eixo Y
        },
        ticks: {
          color: "#ffffff", // Cor dos textos dos valores
        },
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
}
