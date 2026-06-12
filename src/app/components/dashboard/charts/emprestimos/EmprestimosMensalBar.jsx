"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function EmprestimosMensalBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="LineChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Evolução de Empréstimos",
                    curveType: "function",
                    legend: {
                        position: "bottom",
                    },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Mês",
                    },
                    vAxis: {
                        ...chartOptions.vAxis,
                        title: "Quantidade",
                    },
                }}
                width="100%"
                height="100%"
            />
        </div>
    );
}
