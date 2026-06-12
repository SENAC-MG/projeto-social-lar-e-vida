import { test, expect } from "../fixtures/test";

test.describe("Autorização e sessão", () => {
    test("deve bloquear acesso direto a rota interna sem sessão", async ({ page }) => {
        await page.goto("/dashboard");
        await expect(page).toHaveURL("/");
    });

    test("deve manter sessão após recarregar em rota protegida", async ({
        authenticatedPage,
        page,
    }) => {
        await page.goto("/dashboard");
        await expect(page).toHaveURL(/\/dashboard$/);

        await page.reload();
        await expect(authenticatedPage).toHaveURL(/\/dashboard$/);
        await expect(page.getByTestId("file-input")).toBeAttached();
    });
});
