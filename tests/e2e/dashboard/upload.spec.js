import { test, expect } from "../fixtures/test";

test.describe("Dashboard de upload", () => {
    test("deve processar upload de arquivo e concluir status", async ({
        authenticatedPage: _authenticatedPage,
        page,
    }) => {
        await page.goto("/dashboard");

        await page.getByTestId("file-input").setInputFiles({
            name: "arquivo-teste.txt",
            mimeType: "text/plain",
            buffer: Buffer.from("teste"),
        });

        await expect(page.getByText("arquivo-teste.txt")).toBeVisible();
        await expect(page.getByTestId("status")).toHaveText("Concluído", { timeout: 10000 });
    });

    test("deve sinalizar erro para arquivo maior que 10MB", async ({ authenticatedPage: _authenticatedPage, page }) => {
        await page.goto("/dashboard");

        await page.getByTestId("file-input").setInputFiles({
            name: "grande.bin",
            mimeType: "application/octet-stream",
            buffer: Buffer.alloc(11 * 1024 * 1024),
        });

        await expect(page.getByText("grande.bin")).toBeVisible();
        await expect(page.getByText("Arquivo excede o limite de 10MB")).toBeVisible();
        await expect(page.getByTestId("status")).toHaveText("Erro");
    });
});
