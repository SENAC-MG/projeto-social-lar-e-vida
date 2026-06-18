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
    cpf: { width: "17%" },
    cidade: { width: "18%" },
    quantidade: { width: "12%" },
    status: { width: "14%" },
    telefone: { width: "15%" },

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

function EmprestimosPDF({ emprestimos }) {
    const total = emprestimos.length;

    const ativos = contarPorCampo(emprestimos, "status", "ativo");

    const devolvidos = contarPorCampo(emprestimos, "status", "devolvido");

    const totalItens = emprestimos.reduce((acc, item) => acc + (item.quantidade || 0), 0);

    const dataGeracao = new Date().toLocaleString("pt-BR");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Empréstimos</Text>

                    <Text style={styles.subtitle}>
                        Sistema Lar e Vida • Gerado em {dataGeracao}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Total de empréstimos</Text>

                        <Text style={styles.cardValue}>{total}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Empréstimos ativos</Text>

                        <Text style={styles.cardValue}>{ativos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Devolvidos</Text>

                        <Text style={styles.cardValue}>{devolvidos}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Total de itens</Text>

                        <Text style={styles.cardValue}>{totalItens}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de empréstimos</Text>

                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.th, styles.nome]}>Nome</Text>

                        <Text style={[styles.cell, styles.th, styles.cpf]}>CPF</Text>

                        <Text style={[styles.cell, styles.th, styles.cidade]}>Cidade</Text>

                        <Text style={[styles.cell, styles.th, styles.quantidade]}>Quant.</Text>

                        <Text style={[styles.cell, styles.th, styles.status]}>Status</Text>

                        <Text style={[styles.cell, styles.th, styles.telefone]}>Telefone</Text>
                    </View>

                    {emprestimos.map((emprestimo) => (
                        <View style={styles.row} key={emprestimo.id} wrap={false}>
                            <Text style={[styles.cell, styles.nome]}>{emprestimo.nome || "-"}</Text>

                            <Text style={[styles.cell, styles.cpf]}>{emprestimo.cpf || "-"}</Text>

                            <Text style={[styles.cell, styles.cidade]}>
                                {emprestimo.cidade || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.quantidade]}>
                                {emprestimo.quantidade || 0}
                            </Text>

                            <Text style={[styles.cell, styles.status]}>
                                {emprestimo.status || "-"}
                            </Text>

                            <Text style={[styles.cell, styles.telefone]}>
                                {emprestimo.telefone1 || "-"}
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

export default function RelatorioEmprestimosPDF({ emprestimos = [] }) {
    return (
        <PDFDownloadLink
            document={<EmprestimosPDF emprestimos={emprestimos} />}
            fileName="relatorio-emprestimos-lar-e-vida.pdf"
            className="text-sm font-medium text-foreground hover:text-[#5C7A53] transition-colors"
        >
            {({ loading }) => (loading ? "Gerando..." : "Empréstimos")}
        </PDFDownloadLink>
    );
}
