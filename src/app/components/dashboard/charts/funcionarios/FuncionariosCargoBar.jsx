"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function FuncionariosCargoBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="ColumnChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Funcionários por Cargo",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Cargo",
                    },
                    vAxis: {
                        ...chartOptions.vAxis,
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
