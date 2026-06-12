import { test, expect } from "../fixtures/test";

const routes = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Funcionários", path: "/funcionarios" },
    { label: "Pacientes", path: "/pacientes" },
    { label: "Empréstimos", path: "/emprestimos" },
    { label: "Serviços", path: "/servicos" },
];

test.describe("Navegação principal", () => {
    test("deve navegar para rotas principais pela sidebar", async ({ authenticatedPage, page }) => {
        for (const route of routes) {
            await page.getByRole("link", { name: route.label }).click();
            await expect(authenticatedPage).toHaveURL(new RegExp(`${route.path}$`));
        }
    });

    test("deve alternar tema e persistir preferência", async ({ authenticatedPage, page }) => {
        await expect(page.locator("html")).not.toHaveClass(/dark/);

        await page.getByRole("button", { name: /Ativar modo escuro/i }).click();
        await expect(page.locator("html")).toHaveClass(/dark/);

        await page.reload();
        await expect(authenticatedPage.locator("html")).toHaveClass(/dark/);

        const storedTheme = await page.evaluate(
            () => localStorage.getItem("lar-vida-theme") || localStorage.getItem("theme")
        );
        expect(storedTheme).toBe("dark");
    });
});
