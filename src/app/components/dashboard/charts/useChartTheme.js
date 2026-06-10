"use client";

import { useTheme } from "@wrksz/themes/client";
import { useEffect, useMemo, useState } from "react";

export function useChartTheme() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : false;

    const textColor = isDark ? "#f2f2f2" : "#121212";
    const mutedTextColor = isDark ? "#a3a3a3" : "#737373";

    const gridColor = isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";

    const chartOptions = useMemo(
        () => ({
            backgroundColor: "transparent",

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
                gridlines: {
                    color: gridColor,
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
                gridlines: {
                    color: gridColor,
                },
                minValue: 0,
            },

            colors: ["#5c7a53", "#8aa081", "#3d5a80", "#d88c42", "#a6477b"],
        }),
        [textColor, gridColor]
    );

    const chartJsOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,

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

                tooltip: {
                    backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
                    titleColor: isDark ? "#f2f2f2" : "#121212",
                    bodyColor: isDark ? "#f2f2f2" : "#121212",
                    borderColor: gridColor,
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            const value = context.raw ?? 0;
                            return `Quantidade: ${value}`;
                        },
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
                        color: gridColor,
                    },
                },

                y: {
                    beginAtZero: true,
                    title: {
                        color: textColor,
                    },
                    ticks: {
                        color: textColor,
                        precision: 0,
                        stepSize: 1,
                    },
                    grid: {
                        color: gridColor,
                    },
                },
            },
        }),
        [isDark, textColor, gridColor]
    );

    return {
        isDark,
        chartOptions,
        chartJsOptions,
        textColor,
        mutedTextColor,
        mounted,
    };
}