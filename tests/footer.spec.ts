import { test, expect } from "@playwright/test";
import { t } from "../src/i18n";

test("Footer credits the Edgerunr Blog repository", async ({ page }) => {
  await page.goto("/");

  const themeCredit = page.locator(
    '.site-footer a[href="https://github.com/edgerunr-v/blog"]',
  );
  await expect(themeCredit).toHaveText("Edgerunr Blog");
  await expect(themeCredit).toHaveAttribute("target", "_blank");
  await expect(page.locator(".site-footer")).toContainText(
    `${t("footer.theme")}: Edgerunr Blog`,
  );
});
