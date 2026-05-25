const { test, expect } = require("@playwright/test");

const BASE = "http://localhost:3000";

function uniqueEmail() {
  return `playwright.user+${Date.now()}@example.com`;
}

test("E2E: register, login, create note", async ({ page }) => {
  const email = uniqueEmail();
  const password = "PlaywrightPass123!";
  const name = "Playwright User";

  // Register and login via backend API to obtain JWT, then set token in localStorage
  const registerResp = await page.request.post(
    "http://127.0.0.1:8081/api/users/register",
    { data: { name, email, password } },
  );
  expect([200, 201]).toContain(registerResp.status());
  const loginResp = await page.request.post(
    "http://127.0.0.1:8081/api/users/login",
    { data: { email, password } },
  );
  expect(loginResp.ok()).toBeTruthy();
  const loginJson = await loginResp.json();
  const token = loginJson?.accessToken || loginJson?.token || loginJson;

  // Inject token into localStorage before loading the app so protected routes work
  await page.addInitScript(
    (t, u) => {
      localStorage.setItem("token", t);
      localStorage.setItem("user", u);
    },
    token,
    email,
  );
  await page.goto(`${BASE}/dashboard`);

  // Wait for dashboard UI to load and create a note
  await page.waitForSelector('button:has-text("Create Note")', {
    timeout: 10000,
  });
  await page.fill('input[placeholder="Note title"]', "E2E Note Title");
  await page.fill('textarea[placeholder="Note content"]', "E2E Note Content");
  await page.click('button:has-text("Create Note")');

  // Wait and assert the note appears
  await page.waitForTimeout(1000);
  // debug: save page content and screenshot to workspace for inspection
  const fs = require("fs");
  const debugHtml = await page.content();
  fs.writeFileSync("test-debug-dashboard.html", debugHtml);
  await page.screenshot({ path: "test-debug-dashboard.png", fullPage: true });
  await page.waitForSelector("text=E2E Note Title", { timeout: 10000 });
  const note = await page.locator("text=E2E Note Title").first();
  expect(await note.isVisible()).toBeTruthy();
});
