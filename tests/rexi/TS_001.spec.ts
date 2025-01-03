import { test, expect, chromium } from '@playwright/test';

const getEnv = (name: string) => process.env[name] as string;
const getDate = () => {
  const date = new Date();
  return `${
    (date.getDate()).toLocaleString().padStart(2, '0')
  }-${
    (date.getMonth() + 1).toLocaleString().padStart(2, '0')
  }-${
    date.getFullYear()
  }`;
};
const getTime = () => {
  const date = new Date();
  return `${
    date.getHours()
  }-${
    date.getMinutes().toLocaleString().padStart(2, '0')
  }`
};

test('TC_001 - Validate loggin when valid email and password is entered', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  try {
    await page.goto(getEnv('REXI_URL'));
    
    const accessLoginButton = page.locator('button:has(div:has-text("Acceder"))');
    await accessLoginButton.waitFor({ state: 'visible' });
    await accessLoginButton.click();
    const loginForm = page.locator('//form');
    await loginForm.waitFor({ state: 'visible', timeout: 5000 });

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    await emailInput.fill(getEnv('TC_001_EMAIL_CREDENTIAL'));
    await passwordInput.fill(getEnv('TC_001_PASSWORD_CREDENTIAL'));

    const loginButton = page.locator('button[value="login"]');
    await loginButton.click();
    await page.waitForURL(getEnv('TC_001_CONTROL_PANEL_URL'));
    const controlPanel = page.locator('.control-panel');
    const authResult = await page.evaluate(() => localStorage.getItem('rexi-app-user_authnResult'));

    await expect(controlPanel).toBeVisible();
    expect(authResult).toBeDefined();
    expect(JSON.parse(authResult as string)).toHaveProperty('id_token');
    expect(JSON.parse(authResult as string)).toHaveProperty('access_token');
    await page.screenshot({ path: `test-results/${getDate()}/TS_001-TC_001-${getTime()}.png` });
  } catch (error) {
    console.log(error);
  }
  await browser.close();
});

test('TC_002 - Validate loggin when invalid email and password is entered', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  try {
    await page.goto(getEnv('REXI_URL'));
    
    const accessLoginButton = page.locator('button:has(div:has-text("Acceder"))');
    await accessLoginButton.waitFor({ state: 'visible' });
    await accessLoginButton.click();
    const loginForm = page.locator('//form');
    await loginForm.waitFor({ state: 'visible', timeout: 5000 });

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    await emailInput.fill(getEnv('TC_002_EMAIL_CREDENTIAL'));
    await passwordInput.fill(getEnv('TC_002_PASSWORD_CREDENTIAL'));

    const loginButton = page.locator('button[value="login"]');
    await loginButton.click();

    const errorMessage = page.locator('div.msg-error.summary-errors.text-left ul li');
    await errorMessage.waitFor({ state: 'visible' });
    const errorText = await errorMessage.textContent();

    expect(errorText).toContain(getEnv('TC_002_ERROR_TEXT_EXPECTED'));
    await page.screenshot({ path: `test-results/${getDate()}/TS_001-TC_002-${getTime()}.png` });
  } catch (error) {
    console.log(error);
  }
  await browser.close();
});

test('TC_003 - Validate loggin when valid email and invalid password is entered', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  try {
    await page.goto(getEnv('REXI_URL'));
    
    const accessLoginButton = page.locator('button:has(div:has-text("Acceder"))');
    await accessLoginButton.waitFor({ state: 'visible' });
    await accessLoginButton.click();
    const loginForm = page.locator('//form');
    await loginForm.waitFor({ state: 'visible', timeout: 5000 });

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    await emailInput.fill(getEnv('TC_003_EMAIL_CREDENTIAL'));
    await passwordInput.fill(getEnv('TC_003_PASSWORD_CREDENTIAL'));

    const loginButton = page.locator('button[value="login"]');
    await loginButton.click();

    const errorMessage = page.locator('div.msg-error.summary-errors.text-left ul li');
    await errorMessage.waitFor({ state: 'visible' });
    const errorText = await errorMessage.textContent();

    expect(errorText).toContain(getEnv('TC_003_ERROR_TEXT_EXPECTED'));
    await page.screenshot({ path: `test-results/${getDate()}/TS_001-TC_003-${getTime()}.png` });
  } catch (error) {
    console.log(error);
  }
  await browser.close();
});