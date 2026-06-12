"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function EmprestimosQuantidadeBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="BarChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Quantidade de Itens Emprestados",
                    legend: {
                        position: "none",
                    },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Quantidade de Materiais",
                    },
                    vAxis: {
                        ...chartOptions.vAxis,
                        title: "Status",
                    },
                }}
                width="100%"
                height="100%"
            />
        </div>
    );
}
