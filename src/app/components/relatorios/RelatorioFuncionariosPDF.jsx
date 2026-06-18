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
    nome: { width: "24%" },
    email: { width: "27%" },
    cargo: { width: "17%" },
    telefone: { width: "16%" },
    status: { width: "16%" },
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

function contarPorCampo(lista, campo, valor) {
    return lista.filter((item) => item[campo]?.toLowerCase() === valor).length;
}

function FuncionariosPDF({ funcionarios }) {
    const total = funcionarios.length;
    const ativos = contarPorCampo(funcionarios, "status", "ativo");
    const inativos = contarPorCampo(funcionarios, "status", "inativo");

    const cargosUnicos = new Set(
        funcionarios.map((funcionario) => funcionario.cargo).filter(Boolean)
    ).size;

    const dataGeracao = new Date().toLocaleString("pt-BR");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Funcionários</Text>
                    <Text style={styles.subtitle}>
                        Sistema Lar e Vida • Gerado em {dataGeracao}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Total de funcionários</Text>
                        <Text style={styles.cardValue}>{total}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Ativos</Text>
                        <Text style={styles.cardValue}>{ativos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Inativos</Text>
                        <Text style={styles.cardValue}>{inativos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Cargos</Text>
                        <Text style={styles.cardValue}>{cargosUnicos}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de funcionários</Text>

                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.th, styles.nome]}>Nome</Text>
                        <Text style={[styles.cell, styles.th, styles.email]}>E-mail</Text>
                        <Text style={[styles.cell, styles.th, styles.cargo]}>Cargo</Text>
                        <Text style={[styles.cell, styles.th, styles.telefone]}>Telefone</Text>
                        <Text style={[styles.cell, styles.th, styles.status]}>Status</Text>
                    </View>

                    {funcionarios.map((funcionario) => (
                        <View style={styles.row} key={funcionario.id} wrap={false}>
                            <Text style={[styles.cell, styles.nome]}>
                                {funcionario.nome || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.email]}>
                                {funcionario.email || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.cargo]}>
                                {funcionario.cargo || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.telefone]}>
                                {funcionario.telefone || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.status]}>
                                {funcionario.status || "-"}
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

export default function RelatorioFuncionariosPDF({ funcionarios = [] }) {
    return (
        <PDFDownloadLink
            document={<FuncionariosPDF funcionarios={funcionarios} />}
            fileName="relatorio-funcionarios-lar-e-vida.pdf"
            className="text-sm font-medium text-foreground hover:text-[#5C7A53] transition-colors"
        >
            {({ loading }) => (loading ? "Gerando..." : "Funcionários")}
        </PDFDownloadLink>
    );
}
