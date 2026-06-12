export const credentials = {
    email: process.env.E2E_USER_EMAIL || "admin@email.com",
    password: process.env.E2E_USER_PASSWORD || "admin",
};

export async function loginViaUi(page, creds = credentials) {
    await page.goto("/");
    await page.getByLabel("E-mail").fill(creds.email);
    await page.getByLabel("Senha").fill(creds.password);

    await Promise.all([
        page.waitForURL("**/home", { timeout: 15000 }),
        page.getByRole("button", { name: "Entrar no Sistema" }).click(),
    ]);
}
