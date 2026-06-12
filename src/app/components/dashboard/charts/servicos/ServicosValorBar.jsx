"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function ServicosValorBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="ColumnChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Valor Total por Tipo de Serviço",
                    legend: { position: "none" },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Tipo de Serviço",
                    },
                    vAxis: {
                        ...chartOptions.vAxis,
                        title: "Valor Total (R$)",
                    },
                }}
                width="100%"
                height="100%"
            />
        </div>
    );
}
