import DashboardClient from "../components/dashboard/DashboardClient";
import { get_DashboardCharts } from "@modulos/dashboard/controller/dashboardController";
import { get_Pacientes } from "@modulos/pacientes/controller/pacienteController";
import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";

export default async function DashboardPage() {
    const [
        graficos,
        pacientes,
        emprestimos,
        servicos,
        funcionarios,
    ] = await Promise.all([
        get_DashboardCharts(),
        get_Pacientes(),
        get_Emprestimos(),
        get_Servicos(),
        get_Funcionarios(),
    ]);

    const dados = {
        totalPacientes: pacientes.length,
        pacientesAtivos: pacientes.filter(
            (p) => p.status === "ativo"
        ).length,

        totalEmprestimos: emprestimos.length,
        emprestimosAtivos: emprestimos.filter(
            (e) => e.status === "ativo"
        ).length,

        totalServicos: servicos.length,
        servicosPendentes: servicos.filter(
            (s) => s.status === "pendente"
        ).length,

        totalFuncionarios: funcionarios.length,
        funcionariosAtivos: funcionarios.filter(
            (f) => f.status === "ativo"
        ).length,
    };

    return (
        <DashboardClient
            graficos={graficos}
            dashboardStats={dados}
            pacientes={pacientes}
            funcionarios={funcionarios}
            emprestimos={emprestimos}
            servicos={servicos}
        />
    );
}