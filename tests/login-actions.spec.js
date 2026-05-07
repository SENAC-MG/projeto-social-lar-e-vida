// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Testes para as actions de login
 *
 * Estes testes validam o comportamento da função login() definida em actions/login.js
 * através da interface do usuário na página Home.
 *
 * Credenciais válidas:
 * - Email: leopoldino2@gmail.com
 * - Senha: 1234
 */
test.describe('Login Actions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.describe('Login com credenciais válidas', () => {
        test('deve autenticar com email e senha corretos', async ({ page }) => {
            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('1234');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/dashboard');
        });

        test('deve permitir login com campo "Lembrar-me" marcado', async ({ page }) => {
            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('1234');

            await page.getByLabel('Lembrar-me').check();
            await expect(page.getByLabel('Lembrar-me')).toBeChecked();

            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/dashboard');
        });

        test('deve permitir login com campo "Lembrar-me" desmarcado', async ({ page }) => {
            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('1234');

            await page.getByLabel('Lembrar-me').uncheck();
            await expect(page.getByLabel('Lembrar-me')).not.toBeChecked();

            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/dashboard');
        });
    });

    test.describe('Login com credenciais inválidas', () => {
        test('deve falhar com email incorreto', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Usuário ou senha incorretos. Tente novamente.');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('emailincorreto@gmail.com');
            await page.getByLabel('Senha').fill('1234');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com senha incorreta', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Usuário ou senha incorretos. Tente novamente.');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('senhaerrada');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com email e senha incorretos', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Usuário ou senha incorretos. Tente novamente.');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('emailqualquer@teste.com');
            await page.getByLabel('Senha').fill('123456789');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com email vazio', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Favor Informar Usuário e Senha para Logar');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('');
            await page.getByLabel('Senha').fill('1234');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com senha vazia', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Favor Informar Usuário e Senha para Logar');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com ambos os campos vazios', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Favor Informar Usuário e Senha para Logar');
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('');
            await page.getByLabel('Senha').fill('');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });

        test('deve falhar com email em formato inválido', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('email-invalido');
            await page.getByLabel('Senha').fill('1234');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/');
        });
    });

    test.describe('Comportamentos adicionais do login', () => {
        test('deve limpar campos após login falho', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('emailincorreto@gmail.com');
            await page.getByLabel('Senha').fill('senhaerrada');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page.getByLabel('E-mail')).toHaveValue('emailincorreto@gmail.com');
            await expect(page.getByLabel('Senha')).toHaveValue('senhaerrada');
        });

        test('deve permitir nova tentativa de login após falha', async ({ page }) => {
            page.on('dialog', async (dialog) => {
                await dialog.accept();
            });

            await page.getByLabel('E-mail').fill('emailincorreto@gmail.com');
            await page.getByLabel('Senha').fill('senhaerrada');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('1234');
            await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

            await expect(page).toHaveURL('/dashboard');
        });

        test('deve atualizar valor do email em tempo real', async ({ page }) => {
            const emailInput = page.getByLabel('E-mail');

            await emailInput.fill('teste123@email.com');
            await expect(emailInput).toHaveValue('teste123@email.com');

            await emailInput.fill('novoemail@email.com');
            await expect(emailInput).toHaveValue('novoemail@email.com');
        });

        test('deve atualizar valor da senha em tempo real', async ({ page }) => {
            const passwordInput = page.getByLabel('Senha');

            await passwordInput.fill('senha123');
            await expect(passwordInput).toHaveValue('senha123');

            await passwordInput.fill('novasenha456');
            await expect(passwordInput).toHaveValue('novasenha456');
        });

        test('deve mascarar senha no campo de input', async ({ page }) => {
            const passwordInput = page.getByLabel('Senha');
            await passwordInput.fill('minhasenha');

            await expect(passwordInput).toHaveAttribute('type', 'password');
        });
    });

    test.describe('Acessibilidade e navegação', () => {
        test('deve focar no campo de email ao carregar a página', async ({ page }) => {
            await expect(page.getByLabel('E-mail')).toBeFocused();
        });

        test('deve permitir navegação via teclado (Tab)', async ({ page }) => {
            await expect(page.getByLabel('E-mail')).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(page.getByLabel('Senha')).toBeFocused();

            await page.keyboard.press('Tab');
            await expect(page.getByLabel('Lembrar-me')).toBeFocused();

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expect(page.getByRole('button', { name: 'Entrar no Sistema' })).toBeFocused();
        });

        test('deve submeter formulário com Enter', async ({ page }) => {
            await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
            await page.getByLabel('Senha').fill('1234');

            await page.getByLabel('Senha').press('Enter');

            await expect(page).toHaveURL('/dashboard');
        });
    });
});
