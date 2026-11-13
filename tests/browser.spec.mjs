import { test, expect } from '@playwright/test';

test('the GitHub Pages production build really renders, with no JS exceptions', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const response = await page.goto('./');
  expect(response.status()).toBe(200);
  await expect(page.locator('#root h1')).toContainText('You already');
  await expect(page.locator('#root h1')).toContainText('belong here');
  await expect(page.locator('.principle-card')).toHaveCount(9);
  await expect(page.locator('.doorway-tab')).toHaveCount(4);
  await page.locator('.principle-card').first().click();
  await expect(page.locator('.principle-card').first()).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#tab-compassion').click();
  await expect(page.locator('#doorway-panel')).toContainText('Care can be expressed');
  expect(pageErrors).toEqual([]);
});

test('private field notes survive a reload and can be cleared', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('./');
  await page.locator('#field-entry').fill('This is a small moment worth remembering.');
  await page.getByRole('button', { name: /Keep this note/ }).click();
  await expect(page.locator('.saved-note')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.saved-note')).toContainText('This is a small moment worth remembering.');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /Clear browser notes/ }).click();
  await expect(page.locator('.saved-note')).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});

test('mobile menu is usable in a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expect(page.locator('#root h1')).toBeVisible();
  await page.getByRole('button', { name: /Menu/ }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: /Our principles/ }).click();
  await expect(page).toHaveURL(/#principles$/);
  await expect(page.getByRole('button', { name: /Menu/ })).toBeVisible();
});


test('Field Guide chapters render, can be revisited, and persist private progress', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('./');
  await expect(page.locator('.guide-lesson-choice')).toHaveCount(9);
  await expect(page.locator('.guide-progress-track')).toHaveAttribute('aria-valuenow', '0');

  await page.locator('.guide-lesson-choice').filter({ hasText: 'Wonder & Evidence' }).click();
  await expect(page.locator('.guide-lesson-detail h3')).toHaveText('Wonder & Evidence');
  await expect(page.locator('.guide-lesson-detail')).toContainText('A scientific claim needs evidence');
  await page.getByRole('button', { name: 'Mark as explored' }).click();
  await expect(page.locator('.guide-progress-track')).toHaveAttribute('aria-valuenow', '1');

  await page.locator('.guide-reflection a').click();
  await expect(page).toHaveURL(/#field-notes$/);
  await expect(page.locator('.prompt-text')).toContainText('What would honestly change my mind?');

  await page.reload();
  await expect(page.locator('.guide-progress-track')).toHaveAttribute('aria-valuenow', '1');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Clear my progress' }).click();
  await expect(page.locator('.guide-progress-track')).toHaveAttribute('aria-valuenow', '0');
  expect(pageErrors).toEqual([]);
});

test('Field Guide can be reached from the mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.getByRole('button', { name: /Menu/ }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Field guide' }).click();
  await expect(page).toHaveURL(/#field-guide$/);
  await expect(page.locator('#field-guide-heading')).toBeVisible();
  await expect(page.locator('.guide-lesson-detail h3')).toBeVisible();
});
