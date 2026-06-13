"use client";

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 28,
        fontFamily: "Helvetica",
        backgroundColor: "#F4F7F5",
        color: "#1F2937",
    },

    header: {
        backgroundColor: "#5C7A53",
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
        color: "#FFFFFF",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 10,
        opacity: 0.9,
    },

    cardsContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 18,
    },

    card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 12,
        border: "1px solid #DDE5DA",
    },

    cardLabel: {
        fontSize: 9,
        color: "#6B7280",
        marginBottom: 5,
    },

    cardValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#5C7A53",
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#374151",
    },

    table: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #DDE5DA",
    },

    row: {
        flexDirection: "row",
        borderBottom: "1px solid #E5E7EB",
    },

    headerRow: {
        backgroundColor: "#E8EFE6",
    },

    cell: {
        padding: 7,
        fontSize: 8,
    },

    th: {
        fontWeight: "bold",
        color: "#374151",
    },

    nome: {
        width: "24%",
    },

    cpf: {
        width: "16%",
    },

    sexo: {
        width: "10%",
    },

    status: {
        width: "15%",
    },

    prioridade: {
        width: "15%",
    },

    telefone: {
        width: "20%",
    },

    footer: {
        position: "absolute",
        bottom: 18,
        left: 28,
        right: 28,
        fontSize: 8,
        color: "#6B7280",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("pt-BR");
}

function contarPorCampo(lista, campo, valor) {
    return lista.filter((item) => item[campo]?.toLowerCase() === valor).length;
}

function PacientesPDF({ pacientes }) {
    const total = pacientes.length;
    const ativos = contarPorCampo(pacientes, "status", "ativo");
    const emTratamento = contarPorCampo(pacientes, "status", "em tratamento");
    const alta = contarPorCampo(pacientes, "status", "alta");

    const dataGeracao = new Date().toLocaleString("pt-BR");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Pacientes</Text>
                    <Text style={styles.subtitle}>
                        Sistema Lar e Vida • Gerado em {dataGeracao}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Total de pacientes</Text>
                        <Text style={styles.cardValue}>{total}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Ativos</Text>
                        <Text style={styles.cardValue}>{ativos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Em tratamento</Text>
                        <Text style={styles.cardValue}>{emTratamento}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Alta</Text>
                        <Text style={styles.cardValue}>{alta}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de pacientes</Text>

                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.th, styles.nome]}>Nome</Text>
                        <Text style={[styles.cell, styles.th, styles.cpf]}>CPF</Text>
                        <Text style={[styles.cell, styles.th, styles.sexo]}>Sexo</Text>
                        <Text style={[styles.cell, styles.th, styles.status]}>Status</Text>
                        <Text style={[styles.cell, styles.th, styles.prioridade]}>Prioridade</Text>
                        <Text style={[styles.cell, styles.th, styles.telefone]}>Telefone</Text>
                    </View>

                    {pacientes.map((paciente) => (
                        <View style={styles.row} key={paciente.id} wrap={false}>
                            <Text style={[styles.cell, styles.nome]}>{paciente.nome || "-"}</Text>

                            <Text style={[styles.cell, styles.cpf]}>{paciente.cpf || "-"}</Text>

                            <Text style={[styles.cell, styles.sexo]}>{paciente.sexo || "-"}</Text>

                            <Text style={[styles.cell, styles.status]}>
                                {paciente.status || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.prioridade]}>
                                {paciente.prioridade || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.telefone]}>
                                {paciente.telefone1 || "-"}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footer} fixed>
                    <Text>Lar e Vida • Relatório interno</Text>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `Página ${pageNumber} de ${totalPages}`
                        }
                    />
                </View>
            </Page>
        </Document>
    );
}

export default function RelatorioPacientesPDF({ pacientes = [] }) {
    return (
        <PDFDownloadLink
            document={<PacientesPDF pacientes={pacientes} />}
            fileName="relatorio-pacientes-lar-e-vida.pdf"
            className="text-sm font-medium text-foreground hover:text-[#5C7A53] transition-colors"
        >
            {({ loading }) => (loading ? "Gerando..." : "Pacientes")}
        </PDFDownloadLink>
    );
}
