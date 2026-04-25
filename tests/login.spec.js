// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login Page (Home)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve exibir a página de login com todos os elementos', async ({ page }) => {
    // Verificar título da página
    await expect(page).toHaveTitle('Lar e Vida');

    // Verificar elementos do formulário de login
    await expect(page.getByRole('heading', { name: 'Bem-vindo' })).toBeVisible();
    await expect(page.getByLabel('E-mail')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar no Sistema' })).toBeVisible();

    // Verificar checkbox "Lembrar-me"
    await expect(page.getByLabel('Lembrar-me')).toBeVisible();

    // Verificar link "Esqueci minha senha"
    await expect(page.getByRole('link', { name: 'Esqueci minha senha' })).toBeVisible();

    // Verificar link de suporte
    await expect(page.getByRole('link', { name: 'Fale com o suporte' })).toBeVisible();
  });

  test('deve exibir mensagem de erro ao tentar logar sem preencher os campos', async ({ page }) => {
    // Interceptando o alert
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Favor Informar Usuário e Senha para Logar');
      await dialog.accept();
    });

    // Tentar submeter sem preencher os campos
    await page.getByRole('button', { name: 'Entrar no Sistema' }).click();
  });

  test('deve exibir mensagem de erro com credenciais inválidas', async ({ page }) => {
    // Preencher campos com credenciais inválidas
    await page.getByLabel('E-mail').fill('email@invalido.com');
    await page.getByLabel('Senha').fill('senhaerrada');

    // Interceptando o alert de erro
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Usuário ou senha incorretos. Tente novamente.');
      await dialog.accept();
    });

    // Tentar submeter
    await page.getByRole('button', { name: 'Entrar no Sistema' }).click();
  });

  test('deve realizar login com sucesso e redirecionar para o dashboard', async ({ page }) => {
    // Preencher campos com credenciais válidas
    await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
    await page.getByLabel('Senha').fill('1234');

    // Submeter o formulário
    await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

    // Aguardar redirecionamento e verificar URL
    await expect(page).toHaveURL('/dashboard');

    // Verificar elementos do dashboard
    await expect(page.getByRole('heading', { name: 'Lar e Vida' })).toBeVisible();
    await expect(page.getByText('Dashboard de Upload de Arquivos')).toBeVisible();
  });

  test('deve exibir imagem de background na área esquerda', async ({ page }) => {
    // Verificar se a imagem de background está presente (apenas em telas grandes)
    const backgroundElement = page.locator('img[alt="Background Lar e Vida"]');
    await expect(backgroundElement).toBeVisible();
  });

  test('deve exibir logo da empresa', async ({ page }) => {
    // Verificar logos na página de login
    const logos = page.locator('img[alt="Logo Lar e Vida"]');
    await expect(logos).toHaveCount(1);
  });

  test('deve permitir digitar nos campos de email e senha', async ({ page }) => {
    const emailInput = page.getByLabel('E-mail');
    const passwordInput = page.getByLabel('Senha');

    await emailInput.fill('teste@email.com');
    await expect(emailInput).toHaveValue('teste@email.com');

    await passwordInput.fill('minhasenha123');
    await expect(passwordInput).toHaveValue('minhasenha123');
  });

  test('deve exibir depoimento na parte inferior', async ({ page }) => {
    await expect(page.getByText('O sistema mudou completamente a forma como gerenciamos nossas doações')).toBeVisible();
    await expect(page.getByText('Carlos', { exact: true })).toBeVisible();
    await expect(page.getByText('Diretor - Lar e Vida')).toBeVisible();
  });
});
