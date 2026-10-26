/**
 * Automated screenshot generator for docs.valiyou.com
 *
 * Logs into the demo organization and captures screenshots of every page
 * that needs an image in the knowledge center. Saves to the correct path
 * so broken image references are fixed automatically.
 *
 * Screenshots match existing images: 2732×2048 (iPad Pro retina, 2x).
 * Light mode only (matches existing screenshots).
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 npx tsx scripts/screenshot-docs.ts
 *   BASE_URL=https://dev.valiyou.io npx tsx scripts/screenshot-docs.ts
 *
 * Requires: @playwright/test (already installed in the main repo)
 */

import { createRequire } from 'module';
const require = createRequire('/Users/jeppe/Documents/valiyou.io/package.json');
const { chromium } = require('@playwright/test') as typeof import('@playwright/test');
import type { Page } from '@playwright/test';
import { mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const DOCS_ROOT = join(import.meta.dirname, '..');
const IMAGES_ROOT = join(DOCS_ROOT, 'images');

// iPad Pro viewport at 2x = 2732×2048 screenshots
const VIEWPORT = { width: 1366, height: 1024 };

interface Screenshot {
  /** Output path relative to images/ */
  path: string;
  /** App URL to navigate to (after login) */
  url: string;
  /** Optional: wait for a selector before capturing */
  waitFor?: string;
  /** Optional: click something before capturing (e.g. open a modal) */
  click?: string;
  /** Optional: delay in ms after navigation */
  delay?: number;
  /** Optional: description for logging */
  description?: string;
}

const SCREENSHOTS: Screenshot[] = [
  // === Platform / Plugins ===
  {
    path: 'platform/plugins/overview.png',
    url: '/platform/plugins',
    description: 'Plugins overview page',
    delay: 2000,
  },
  {
    path: 'platform/plugins/social-deep-dive-config.png',
    url: '/platform/plugins',
    description: 'Social Deep Dive config (if modal can be opened)',
    delay: 2000,
  },

  // === Platform / Settings ===
  {
    path: 'platform/settings/platform-tab.png',
    url: '/platform/settings',
    description: 'Settings - Platform tab',
    delay: 2000,
  },
  {
    path: 'platform/settings/base-currency.png',
    url: '/platform/settings',
    description: 'Settings - Base Currency section',
    delay: 2000,
  },
  {
    path: 'platform/settings/brand-value-indicators.png',
    url: '/platform/settings?tab=valuations',
    description: 'Settings - Brand Value Indicators',
    delay: 2000,
  },
  {
    path: 'platform/settings/valuations-tab.png',
    url: '/platform/settings?tab=valuations',
    description: 'Settings - Valuations tab',
    delay: 2000,
  },
  {
    path: 'platform/settings/documents.png',
    url: '/platform/documents',
    description: 'Documents page',
    delay: 2000,
  },
  {
    path: 'platform/settings/upload-document-modal.png',
    url: '/platform/documents',
    description: 'Upload document modal',
    delay: 2000,
  },

  // === Sponsorships ===
  {
    path: 'sponsorships/inventory/adjust-modal.png',
    url: '/products/sponsorships/inventory',
    description: 'Inventory page',
    delay: 2000,
  },
  {
    path: 'sponsorships/inventory/history-modal.png',
    url: '/products/sponsorships/inventory',
    description: 'Inventory history',
    delay: 2000,
  },
  {
    path: 'sponsorships/packages/quantity-input.png',
    url: '/products/sponsorships/packages',
    description: 'Packages page',
    delay: 2000,
  },
  {
    path: 'sponsorships/packages/pdf-design-templates.png',
    url: '/products/sponsorships/packages',
    description: 'Packages - PDF design',
    delay: 2000,
  },
  {
    path: 'sponsorships/packages/attach-documents.png',
    url: '/products/sponsorships/packages',
    description: 'Packages - attach documents',
    delay: 2000,
  },

  // === Analytics ===
  {
    path: 'analytics-dashboard.png',
    url: '/products/sponsorships/analytics',
    description: 'Sponsorship Analytics dashboard',
    delay: 3000,
  },

  // === Valuations ===
  {
    path: 'valuations/dashboard/overview.png',
    url: '/products/valuations/dashboard',
    description: 'Valuations Dashboard',
    delay: 3000,
  },
  {
    path: 'valuations/valuations-list/overview.png',
    url: '/products/valuations/valuations',
    description: 'Valuations list',
    delay: 2000,
  },
  {
    path: 'valuations/reports/overview.png',
    url: '/products/valuations/reports',
    description: 'Reports page',
    delay: 2000,
  },
];

async function loginAsDemoUser(page: Page) {
  await page.goto(`${BASE_URL}/auth/login`);
  const result = await page.evaluate(async () => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const signUp = await fetch('/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `demo-${id}@valiyou.demo`,
        password:
          Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12),
        name: 'Doc Screenshots',
      }),
    });
    if (!signUp.ok) return `sign-up failed: ${signUp.status}`;
    const join = await fetch('/api/platform/demo/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recaptchaToken: 'demo-signup-bypass' }),
    });
    if (!join.ok) return `demo join failed: ${join.status}`;
    sessionStorage.setItem('onboardingJustCompleted', 'true');
    return 'ok';
  });
  if (result !== 'ok') throw new Error(`Login failed: ${result}`);
  // Wait for dashboard to load
  await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);
}

async function cleanupDemoUser(page: Page) {
  await page.evaluate(async () => {
    await fetch('/api/demo/cleanup', { method: 'DELETE' });
    await fetch('/api/auth/sign-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
  });
}

async function main() {
  console.log(`\nScreenshot generator for docs.valiyou.com`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${IMAGES_ROOT}`);
  console.log(`Viewport: ${VIEWPORT.width}×${VIEWPORT.height} (2x = ${VIEWPORT.width * 2}×${VIEWPORT.height * 2})`);
  console.log(`Screenshots: ${SCREENSHOTS.length}\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // Retina → 2732×2048 output
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  try {
    // Login
    console.log('Logging in as demo user...');
    await loginAsDemoUser(page);
    console.log('Logged in.\n');

    let captured = 0;
    let skipped = 0;

    for (const shot of SCREENSHOTS) {
      const outPath = join(IMAGES_ROOT, shot.path);
      const dir = dirname(outPath);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      try {
        console.log(`📸 ${shot.description || shot.path}`);
        console.log(`   → ${shot.url}`);

        await page.goto(`${BASE_URL}${shot.url}`, { waitUntil: 'networkidle' });

        if (shot.waitFor) {
          await page.waitForSelector(shot.waitFor, { timeout: 10000 });
        }

        if (shot.delay) {
          await page.waitForTimeout(shot.delay);
        }

        if (shot.click) {
          await page.click(shot.click);
          await page.waitForTimeout(1000);
        }

        await page.screenshot({ path: outPath, type: 'png' });
        console.log(`   ✅ ${outPath}\n`);
        captured++;
      } catch (err) {
        console.log(`   ❌ ${err instanceof Error ? err.message : String(err)}\n`);
        skipped++;
      }
    }

    // Cleanup
    console.log('Cleaning up demo user...');
    await cleanupDemoUser(page);

    console.log(`\nDone: ${captured} captured, ${skipped} skipped`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
