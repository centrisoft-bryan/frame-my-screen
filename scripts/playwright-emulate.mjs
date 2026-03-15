import { chromium, devices } from "playwright";

const raw = process.argv[2];
const payload = raw ? JSON.parse(raw) : {};

const FALLBACKS = {
  "Desktop Chrome": {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  },
  "Desktop Chrome HiDPI": {
    viewport: { width: 1512, height: 982 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  },
  "Desktop Edge HiDPI": {
    viewport: { width: 1504, height: 1003 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
  },
};

function buildContextOptions(config) {
  const preset = config.emulationKey && (devices[config.emulationKey] || FALLBACKS[config.emulationKey]);

  if (preset) {
    return {
      ...preset,
      viewport: preset.viewport || { width: config.width || 1440, height: config.height || 900 },
    };
  }

  return {
    viewport: { width: config.width || 1440, height: config.height || 900 },
    deviceScaleFactor: config.type === "desktop" ? 1 : 2,
    isMobile: config.type !== "desktop",
    hasTouch: config.type !== "desktop",
  };
}

async function main() {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext(buildContextOptions(payload));
  const page = await context.newPage();
  await page.goto(payload.url || "https://example.com", { waitUntil: "domcontentloaded" });

  browser.on("disconnected", () => process.exit(0));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
