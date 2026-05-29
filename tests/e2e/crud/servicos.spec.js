const { test, expect } = require('@playwright/test');
const { loginViaUi } = require('../support/auth');

test.describe('Serviços CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUi(page);
  });

  test('cadastrar serviço e editar', async ({ page }) => {
    const sufix = Date.now();
    const nome = `Servico Teste ${sufix}`;
    const novoNome = `Servico Alterado ${sufix}`;

    await page.goto('/servicos');
    await page.getByRole('button', { name: 'Novo Serviço' }).click();

    await page.locator('input[name="nome"]').fill(nome);
    await page.locator('input[name="cpf"]').fill(String(sufix).slice(0, 11));
    await page.locator('input[name="tipoServico"]').fill('Consulta');
    await page.locator('input[name="duracao"]').fill('30min');
    await page.locator('input[name="valorServico"]').fill('50');
    await page.getByRole('button', { name: 'Hora' }).click();
    await page.locator('input[name="tempoServico"]').fill('30');
    await page.locator('select[name="status"]').selectOption('pendente');
    await page.locator('input[name="dataServico"]').fill('2024-01-01');

    await page.getByRole('button', { name: 'Salvar Serviço' }).click();

    await expect(page.getByText(nome)).toBeVisible({ timeout: 5000 });

    // Editar
    const row = page.locator('tr', { hasText: nome });
    await row.getByTitle('Editar serviço').click();

    await page.locator('input[name="nome"]').fill(novoNome);
    await page.getByRole('button', { name: 'Salvar alterações' }).click();

    await expect(page.getByText(novoNome)).toBeVisible({ timeout: 5000 });
  });
});
