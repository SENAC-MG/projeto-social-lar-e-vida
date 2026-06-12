"use server";

import { getDashboardChartsService } from "../services/dashboardService";

export async function get_DashboardCharts() {
    return await getDashboardChartsService();
}
