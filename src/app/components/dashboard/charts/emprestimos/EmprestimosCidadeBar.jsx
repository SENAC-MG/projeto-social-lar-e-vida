"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function EmprestimosCidadeBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="ColumnChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Empréstimos por Cidade",
                    legend: {
                        position: "none",
                    },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Cidade",
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
