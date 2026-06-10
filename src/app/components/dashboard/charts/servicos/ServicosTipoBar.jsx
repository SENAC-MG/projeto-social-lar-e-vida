"use client";

import { Chart } from "react-google-charts";
import { useChartTheme } from "../useChartTheme";

export default function ServicosTipoBar({ dados }) {
    const { chartOptions } = useChartTheme();

    return (
        <div className="bg-card border border-border rounded-2xl p-5 h-[350px]">
            <Chart
                chartType="ColumnChart"
                data={dados}
                options={{
                    ...chartOptions,
                    title: "Serviços por Tipo",
                    legend: { position: "none" },
                    backgroundColor: "transparent",
                    hAxis: {
                        ...chartOptions.hAxis,
                        title: "Tipo de Serviço",
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
