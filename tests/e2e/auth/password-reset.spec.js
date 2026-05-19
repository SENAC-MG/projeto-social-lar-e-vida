import { test, expect } from '../fixtures/test';
import { createResetToken, ensureResetUser, resetUser } from '../support/password-reset';

test.describe('Recuperação de senha', () => {
  test.beforeEach(async () => {
    await ensureResetUser();
  });

  test('deve exibir mensagem neutra na solicitação de recuperação', async ({ page }) => {
    await page.goto('/recuperar-senha');

    await page.getByLabel('E-mail').fill('nao-existe@email.com');
    await page.getByRole('button', { name: 'Enviar instruções' }).click();

    await expect(
      page.getByText('Se o e-mail estiver cadastrado, você receberá instruções para redefinição de senha.'),
    ).toBeVisible();
  });

  test('deve redefinir senha com token válido', async ({ page }) => {
    const token = await createResetToken();
    const novaSenha = 'Reset@123456';

    await page.goto(`/redefinir-senha?token=${token}`);
    await page.getByLabel('Nova senha').fill(novaSenha);
    await page.getByRole('button', { name: 'Redefinir senha' }).click();

    await expect(page.getByText('Senha redefinida com sucesso. Faça login com sua nova senha.')).toBeVisible();

    await page.goto('/');
    await page.getByLabel('E-mail').fill(resetUser.email);
    await page.getByLabel('Senha').fill(novaSenha);
    await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

    await expect(page).toHaveURL(/\/home$/);
  });
});
