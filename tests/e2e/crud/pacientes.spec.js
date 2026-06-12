const { test, expect } = require("@playwright/test");
const { loginViaUi } = require("../support/auth");

test.describe("Pacientes CRUD", () => {
    test.beforeEach(async ({ page }) => {
        await loginViaUi(page);
    });

    test("cadastrar paciente e editar", async ({ page }) => {
        const sufix = Date.now();
        const nome = `Paciente Teste ${sufix}`;
        const novoNome = `Paciente Alterado ${sufix}`;

        await page.goto("/pacientes");
        await page.getByRole("button", { name: "Novo Paciente" }).click();

        await page.locator('input[name="nome"]').fill(nome);
        await page.locator('input[name="cpf"]').fill(String(sufix).slice(0, 11));
        await page.locator('input[name="rg"]').fill("MG-00-000");
        await page.locator('select[name="sexo"]').selectOption("Masculino");
        await page.locator('input[name="nascimento"]').fill("1990-01-01");
        await page.locator('select[name="status"]').selectOption("ativo");
        await page.locator('select[name="prioridade"]').selectOption("media");

        await page.getByRole("button", { name: "Salvar" }).click();

        await expect(page.getByText(nome)).toBeVisible({ timeout: 5000 });

        // Editar
        const row = page.locator("tr", { hasText: nome });
        await row.getByTitle("Editar paciente").click();

        await page.locator('input[name="nome"]').fill(novoNome);
        await page.getByRole("button", { name: "Salvar alterações" }).click();

        await expect(page.getByText(novoNome)).toBeVisible({ timeout: 5000 });
    });
});
