import { getDashboardChartsRepository } from "../repository/dashboardRepository";

export async function getDashboardChartsService() {
    return await getDashboardChartsRepository();
}
