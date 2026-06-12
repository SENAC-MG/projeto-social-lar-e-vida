"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function ServicosResponsavelBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="BarChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Serviços por Responsável",
                    legend: { position: "none" },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Quantidade",
                    },
                    vAxis: {
                        ...chartOptions.vAxis,
                        title: "Funcionário",
                    },
                }}
                width="100%"
                height="100%"
            />
        </div>
    );
}
