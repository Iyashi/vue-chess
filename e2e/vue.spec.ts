import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Chess Game Application')
})

test('visits the chess-game url', async ({ page }) => {
  await page.goto('/chess')
  await expect(page.locator('h2')).toHaveText('Chess View')
})
