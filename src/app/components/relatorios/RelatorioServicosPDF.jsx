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

    nome: { width: "20%" },
    tipo: { width: "18%" },
    responsavel: { width: "20%" },
    duracao: { width: "12%" },
    valor: { width: "15%" },
    status: { width: "15%" },

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

function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value || 0);
}

function ServicosPDF({ servicos }) {
    const total = servicos.length;

    const pendentes = contarPorCampo(servicos, "status", "pendente");

    const concluidos = contarPorCampo(servicos, "status", "concluido");

    const valorTotal = servicos.reduce((acc, servico) => acc + (servico.valorServico || 0), 0);

    const dataGeracao = new Date().toLocaleString("pt-BR");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Serviços</Text>

                    <Text style={styles.subtitle}>
                        Sistema Lar e Vida • Gerado em {dataGeracao}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Total de serviços</Text>

                        <Text style={styles.cardValue}>{total}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Pendentes</Text>

                        <Text style={styles.cardValue}>{pendentes}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Concluídos</Text>

                        <Text style={styles.cardValue}>{concluidos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Valor total</Text>

                        <Text style={styles.cardValue}>{formatCurrency(valorTotal)}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de serviços</Text>

                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.th, styles.nome]}>Nome</Text>

                        <Text style={[styles.cell, styles.th, styles.tipo]}>Serviço</Text>

                        <Text style={[styles.cell, styles.th, styles.responsavel]}>
                            Responsável
                        </Text>

                        <Text style={[styles.cell, styles.th, styles.duracao]}>Duração</Text>

                        <Text style={[styles.cell, styles.th, styles.valor]}>Valor</Text>

                        <Text style={[styles.cell, styles.th, styles.status]}>Status</Text>
                    </View>

                    {servicos.map((servico) => (
                        <View style={styles.row} key={servico.id} wrap={false}>
                            <Text style={[styles.cell, styles.nome]}>{servico.nome || "-"}</Text>

                            <Text style={[styles.cell, styles.tipo]}>
                                {servico.tipoServico || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.responsavel]}>
                                {servico.funcionarioResponsavel || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.duracao]}>
                                {servico.duracao || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.valor]}>
                                {formatCurrency(servico.valorServico)}
                            </Text>

                            <Text style={[styles.cell, styles.status]}>
                                {servico.status || "-"}
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

export default function RelatorioServicosPDF({ servicos = [] }) {
    return (
        <PDFDownloadLink
            document={<ServicosPDF servicos={servicos} />}
            fileName="relatorio-servicos-lar-e-vida.pdf"
            className="text-sm font-medium text-foreground hover:text-[#5C7A53] transition-colors"
        >
            {({ loading }) => (loading ? "Gerando..." : "Serviços")}
        </PDFDownloadLink>
    );
}
