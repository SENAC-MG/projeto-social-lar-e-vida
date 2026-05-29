const { test, expect } = require('@playwright/test');
const { loginViaUi } = require('../support/auth');

test.describe('Empréstimos CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUi(page);
  });

  test('cadastrar empréstimo e editar', async ({ page }) => {
    const sufix = Date.now();
    const nome = `Emprestimo Teste ${sufix}`;
    const novoNome = `Emprestimo Alterado ${sufix}`;

    await page.goto('/emprestimos');
    await page.getByRole('button', { name: 'Novo Empréstimo' }).click();

    await page.locator('input[name="nome"]').fill(nome);
    await page.locator('input[name="cpf"]').fill(String(sufix).slice(0, 11));
    await page.locator('input[name="rg"]').fill('MG-00-000');
    await page.locator('input[name="nascimento"]').fill('1990-01-01');
    await page.locator('input[name="dataEmprestimo"]').fill('2024-01-01');
    await page.locator('input[name="quantidade"]').fill('1');
    await page.locator('textarea[name="materiaisEmprestados"]').fill('Teste item');
    await page.locator('input[name="rua"]').fill('Rua Teste');
    await page.locator('input[name="numero"]').fill('123');
    await page.locator('input[name="cep"]').fill('00000-000');
    await page.locator('input[name="bairro"]').fill('Bairro');
    await page.locator('input[name="cidade"]').fill('Cidade');
    await page.locator('input[name="telefone1"]').fill('31999999999');
    await page.locator('input[name="telefone2"]').fill('31999999998');
    await page.locator('select[name="status"]').selectOption('ativo');

    await page.getByRole('button', { name: 'Salvar' }).click();

    await expect(page.getByText(nome)).toBeVisible({ timeout: 5000 });

    // Editar
    const row = page.locator('tr', { hasText: nome });
    await row.getByTitle('Editar empréstimo').click();

    await page.locator('input[name="nome"]').fill(novoNome);
    await page.getByRole('button', { name: 'Salvar alterações' }).click();

    await expect(page.getByText(novoNome)).toBeVisible({ timeout: 5000 });
  });
});
