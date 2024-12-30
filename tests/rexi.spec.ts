import { test, expect } from '@playwright/test';

test('Validate loggin when valid email and password is entered', async ({ page }) => {
  await page.goto('https://rexi.do', { waitUntil: 'load' });
  const accessLoginButton = page.locator('button:has(div:has-text("Acceder"))');
  await accessLoginButton.click();
  await page.locator('//form').waitFor({ state: 'visible', timeout: 5000 });
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  await emailInput.fill('anthonyde98@gmail.com');
  await passwordInput.fill('Prueba@01');
  const loginButton = page.locator('button[value="login"]');
  await loginButton.click();
  await page.waitForURL('https://www.rexi.do/panel-de-control/vista-general'); 
  const item = await page.evaluate(() => {
    return localStorage.getItem('rexi-app-user_authnResult');
  });
  await expect(page).toHaveURL('https://www.rexi.do/panel-de-control/vista-general');
  expect(item).toBeDefined();
  expect(JSON.parse(item as string)).toHaveProperty('id_token');
  expect(JSON.parse(item as string)).toHaveProperty('access_token');
});
