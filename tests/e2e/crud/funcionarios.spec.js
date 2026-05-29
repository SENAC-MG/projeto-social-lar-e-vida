const { test, expect } = require('@playwright/test');
const { loginViaUi } = require('../support/auth');

test.describe('Funcionários CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUi(page);
  });

  test('cadastrar funcionário e editar', async ({ page }) => {
    const sufix = Date.now();
    const nome = `Funcionario Teste ${sufix}`;
    const novoNome = `Funcionario Alterado ${sufix}`;
    const email = `e2e+${sufix}@example.com`;

    await page.goto('/funcionarios');
    await page.getByRole('button', { name: 'Novo Funcionário' }).click();

    await page.locator('input[name="nome"]').fill(nome);
    await page.locator('input[name="cargo"]').fill('Assistente');
    await page.locator('input[name="dataContratacao"]').fill('2020-01-01');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="telefone"]').fill('31999999999');
    await page.locator('select[name="status"]').selectOption('ativo');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText(nome)).toBeVisible({ timeout: 5000 });

    // Editar
    const row = page.locator('tr', { hasText: nome });
    await row.getByTitle('Editar funcionário').click();

    await page.locator('input[name="nome"]').fill(novoNome);
    await page.getByRole('button', { name: 'Salvar alterações' }).click();

    await expect(page.getByText(novoNome)).toBeVisible({ timeout: 5000 });
  });
});
