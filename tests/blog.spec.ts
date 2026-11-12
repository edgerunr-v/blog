import { test, expect } from "@playwright/test";
import { t, language, ogLocale } from "../src/i18n";
import settings from "../src/site.config.json" with { type: "json" };

const postPath = "/posts/welcome-to-edgerunr-blog/";

test("Homepage lists the current post and categories", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".post-feed")).toHaveAttribute(
    "data-ready",
    "true",
  );
  await expect(page.locator(".post-card")).toHaveCount(1);
  await expect(page.locator(".post-card")).toContainText("What's up Choom");
  await expect(
    page.getByRole("button", { name: t("category.dev-notes"), exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: t("category.dev-notes"), exact: true })
    .click();
  await expect(page.locator(".post-card")).toHaveCount(1);
  await expect(page).toHaveURL(/category=dev-notes/);
});

test("Post page renders metadata and generated cover", async ({ page }) => {
  await page.goto(postPath);
  await expect(page.locator("h1")).toHaveText("What's up Choom");
  await expect(page.locator(".article-cover .post-cover")).toBeVisible();
  await expect(page.locator("#article-body")).toContainText(
    "local AI networking",
  );
  await expect(page.locator(".article-tags .chip")).toHaveCount(3);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
});

test("Site is English-only and exposes current metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", language);
  await expect(page).toHaveTitle(
    `${settings.site.name} · ${t("site.titleSuffix")}`,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    ogLocale,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    t("site.description"),
  );
  expect(await page.locator("body").innerText()).not.toMatch(
    /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/u,
  );
});

test("RSS, sitemap, and legacy routes work", async ({ page, request }) => {
  const feed = await request.get("/rss.xml");
  expect(feed.status()).toBe(200);
  expect((await feed.text()).match(/<item>/g)).toHaveLength(1);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  await page.goto("/articles/");
  await expect(page).toHaveURL(/\/posts\//);
  await page.goto("/comments/");
  await expect(page).toHaveURL(/\/messages\//);
});

test("Main routes and local assets load without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const path of ["/", "/posts/", "/friends/", "/about/", "/messages/"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (image) =>
              !(image as HTMLImageElement).complete ||
              (image as HTMLImageElement).naturalWidth === 0,
          )
          .map((image) => image.getAttribute("src")),
      );
    expect(broken, path).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("Visual preset and dark mode persist across reloads", async ({ page }) => {
  await page.goto("/");
  const presetButton = page.getByRole("button", {
    name: /Change visual preset/,
  });
  await presetButton.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-preset",
    "dark-homelab",
  );
  const darkHomelabBackground = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--bg"),
  );
  expect(darkHomelabBackground.trim()).toBe("#0b1220");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-preset",
    "dark-homelab",
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--bg")
          .trim(),
      ),
    )
    .toBe("#0b1220");
  await page.getByRole("button", { name: t("nav.dark") }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("Guestbook saves and displays a message", async ({ page }) => {
  await page.goto("/messages/");
  await page.getByLabel(t("guestbook.name")).fill("edgerunr-v");
  await page
    .getByRole("textbox", { name: t("guestbook.content") })
    .fill("Launch test message");
  await page.getByRole("button", { name: t("guestbook.submit") }).click();
  await expect(page.locator(".message")).toContainText("Launch test message");
});
