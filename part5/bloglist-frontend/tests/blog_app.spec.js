// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

// Full Stack Open Part 5, exercises 5.17-5.23
// End-to-end tests (Playwright) for the bloglist frontend.
// The backend test database is reset through
// POST /api/testing/reset ( Part 4 backend -- add a testing
// router in test mode when running these tests locally).
// Run with: npm test

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' } })
    await page.goto('/')
  })

  test('Login form is shown (5.17)', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials (5.18)', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials (5.18)', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created (5.19)', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('A blog created by playwright')
      await page.getByPlaceholder('author').fill('Playwright')
      await page.getByPlaceholder('url').fill('https://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('A blog created by playwright Playwright')).toBeVisible()
    })

    test('a blog can be liked (5.20)', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('Likable blog')
      await page.getByPlaceholder('author').fill('Playwright')
      await page.getByPlaceholder('url').fill('https://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('the user who created a blog can delete it (5.21)', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('To be deleted')
      await page.getByPlaceholder('author').fill('Playwright')
      await page.getByPlaceholder('url').fill('https://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      page.on('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('To be deleted Playwright')).not.toBeVisible()
    })

    test('blogs are ordered by likes, most liked first (5.22)', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('Least liked')
      await page.getByPlaceholder('author').fill('Playwright')
      await page.getByPlaceholder('url').fill('https://example.com/1')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('Most liked')
      await page.getByPlaceholder('author').fill('Playwright')
      await page.getByPlaceholder('url').fill('https://example.com/2')
      await page.getByRole('button', { name: 'create' }).click()
      const blogs = page.locator('.blog')
      await blogs.nth(1).getByRole('button', { name: 'view' }).click()
      await blogs.nth(1).getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await expect(blogs.first()).toContainText('Most liked')
    })
  })
})
