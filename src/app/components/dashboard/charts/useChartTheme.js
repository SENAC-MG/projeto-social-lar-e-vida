"use client";

import { useTheme } from "@wrksz/themes/client";
import { useEffect, useState, useMemo } from "react";

export function useChartTheme() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : false;

    // Cores de texto baseadas no tema
    const textColor = isDark ? "#f2f2f2" : "#121212";
    const mutedTextColor = isDark ? "#a3a3a3" : "#737373";

    // Opções para Google Charts
    const chartOptions = useMemo(() => ({
        titleTextStyle: {
            color: textColor,
            fontSize: 16,
            bold: true,
        },
        legendTextStyle: {
            color: textColor,
            fontSize: 12,
        },
        hAxis: {
            titleTextStyle: {
                color: textColor,
                fontSize: 12,
            },
            textStyle: {
                color: textColor,
                fontSize: 11,
            },
        },
        vAxis: {
            titleTextStyle: {
                color: textColor,
                fontSize: 12,
            },
            textStyle: {
                color: textColor,
                fontSize: 11,
            },
        },
        colors: ["#5c7a53", "#8aa081", "#3d5a80", "#d88c42", "#a6477b"],
    }), [isDark, textColor]);

    // Opções para Chart.js
    const chartJsOptions = useMemo(() => ({
        plugins: {
            title: {
                color: textColor,
                font: {
                    size: 16,
                    weight: "bold",
                },
            },
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                title: {
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
            },
            y: {
                title: {
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
            },
        },
    }), [isDark, textColor]);

    return { isDark, chartOptions, chartJsOptions, textColor, mutedTextColor, mounted };
}
