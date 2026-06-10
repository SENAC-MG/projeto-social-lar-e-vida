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
import { useChartTheme } from "../useChartTheme";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export default function PacientesCancerBar({ dados = [] }) {
    const { chartJsOptions, textColor } = useChartTheme();
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
        ...chartJsOptions,
        plugins: {
            ...chartJsOptions.plugins,
            title: {
                ...chartJsOptions.plugins?.title,
                display: true,
                text: "Tipos de Câncer Registrados",
            },
            legend: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Bar data={data} options={options} />
        </div>
    );
}
