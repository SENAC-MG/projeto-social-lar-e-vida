import { test, expect } from "../fixtures/test";

test.describe("Autenticação", () => {
    test("deve autenticar com credenciais válidas e redirecionar para home", async ({
        page,
        credentials,
    }) => {
        await page.goto("/");
        await page.getByLabel("E-mail").fill(credentials.email);
        await page.getByLabel("Senha").fill(credentials.password);
        await page.getByRole("button", { name: "Entrar no Sistema" }).click();

        await expect(page).toHaveURL(/\/home$/);
        await expect(page.getByRole("link", { name: "Lar e Vida Hospitalar" })).toBeVisible();
    });

    test("deve manter na página de login quando credenciais são inválidas", async ({ page }) => {
        await page.goto("/");

        const dialogPromise = page.waitForEvent("dialog");
        await page.getByLabel("E-mail").fill("invalido@email.com");
        await page.getByLabel("Senha").fill("senha-invalida");
        await page.getByRole("button", { name: "Entrar no Sistema" }).click();

        const dialog = await dialogPromise;
        expect(dialog.message()).toBe("Usuário ou senha incorretos. Tente novamente.");
        await dialog.accept();

        await expect(page).toHaveURL("/");
    });

    test("deve redirecionar usuário autenticado ao acessar /", async ({
        authenticatedPage,
        page,
    }) => {
        await page.goto("/");
        await expect(authenticatedPage).toHaveURL(/\/home$/);
    });
});
