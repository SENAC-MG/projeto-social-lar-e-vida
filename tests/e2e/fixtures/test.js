import { test as base, expect } from "@playwright/test";
import { credentials, loginViaUi } from "../support/auth";

export const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    credentials: async ({}, use) => {
        await use(credentials);
    },
    authenticatedPage: async ({ page }, use) => {
        await loginViaUi(page);
        await expect(page).toHaveURL(/\/home$/);
        await use(page);
    },
});

export { expect };
