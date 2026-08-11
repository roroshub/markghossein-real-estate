import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const outDir = process.env.SHOT_DIR ?? "screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);
await page.screenshot({ path: `${outDir}/01-hero.png` });

const sections = ["#studio", "#services", "#works", "#process", "#testimonials", "#contact"];
for (const [i, sel] of sections.entries()) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${outDir}/0${i + 2}-${sel.slice(1)}.png` });
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1400);
await page.screenshot({ path: `${outDir}/08-footer.png` });

// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:3000", { waitUntil: "networkidle" });
await mobile.waitForTimeout(2400);
await mobile.screenshot({ path: `${outDir}/09-mobile-hero.png` });
await mobile.locator("#works").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: `${outDir}/10-mobile-works.png` });

await browser.close();
console.log("done");
