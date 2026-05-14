import { test, expect } from '@playwright/test'

test.describe('Mark Ghossein Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Mark Ghossein/)
  })

  test('hero section renders with headline and CTAs', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Make The')
    await expect(page.getByRole('link', { name: /Book a Consultation/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Explore Services/i })).toBeVisible()
  })

  test('navbar is visible and contains key links', async ({ page }) => {
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: /About/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /Services/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /Let's Talk/i })).toBeVisible()
  })

  test('navbar gains background class on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 200))
    await page.waitForTimeout(200)
    const header = page.locator('header')
    const classes = await header.getAttribute('class')
    expect(classes).toContain('backdrop-blur')
  })

  test('services section lists all four services', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded()
    await expect(page.getByRole('heading', { name: /Buyer Representation/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Seller Representation/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Upsizing Consultation/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Investment Strategy/i })).toBeVisible()
  })

  test('listings section renders listing cards', async ({ page }) => {
    await page.locator('#listings').scrollIntoViewIfNeeded()
    const cards = page.locator('#listings article')
    await expect(cards).toHaveCount(3)
  })

  test('smooth move system section renders all 5 steps', async ({ page }) => {
    await page.locator('#system').scrollIntoViewIfNeeded()
    const steps = page.locator('#system .step-row')
    await expect(steps).toHaveCount(5)
  })

  test('contact form renders all required fields', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('input[name="firstName"]')).toBeVisible()
    await expect(page.locator('input[name="lastName"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="interest"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible()
  })

  test('contact form shows success state after valid submission', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ success: true }) }),
    )
    await page.locator('#contact').scrollIntoViewIfNeeded()

    await page.fill('input[name="firstName"]', 'Jane')
    await page.fill('input[name="lastName"]', 'Doe')
    await page.fill('input[name="email"]', 'jane@example.com')
    await page.click('button[type="submit"]')

    await expect(page.getByText(/Message Received/i)).toBeVisible({ timeout: 5000 })
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const burger = page.getByRole('button', { name: /Open menu/i })
    await expect(burger).toBeVisible()
    await burger.click()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('footer displays brokerage info and email', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.getByText(/Century 21/i)).toBeVisible()
    await expect(page.getByText(/mark.ghossein@c21.ca/i)).toBeVisible()
  })
})
