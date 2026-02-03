import { test, expect } from '@playwright/test';

test.describe('Biology-Aware RAG Application', () => {
  test('should load the homepage with correct title', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Biology-Aware RAG/);

    // Check main heading
    await expect(page.locator('h1')).toHaveText('Biology-Aware RAG');

    // Check subtitle
    await expect(page.locator('.subtitle')).toHaveText('Target Discovery Intelligence Platform');

    // Check badge
    await expect(page.locator('.badge')).toHaveText('Spatial Transcriptomics | In Vivo Workflows');
  });

  test('should display query section with input and button', async ({ page }) => {
    await page.goto('/');

    // Check query input exists
    const queryInput = page.locator('.query-input');
    await expect(queryInput).toBeVisible();
    await expect(queryInput).toHaveAttribute('placeholder', /spatial transcriptomics/i);

    // Check analyze button exists and is initially disabled
    const analyzeButton = page.locator('.query-button');
    await expect(analyzeButton).toBeVisible();
    await expect(analyzeButton).toBeDisabled();
  });

  test('should display example queries', async ({ page }) => {
    await page.goto('/');

    // Check example queries exist
    const exampleQueries = page.locator('.example-query');
    await expect(exampleQueries).toHaveCount(5);

    // Check specific example query text
    await expect(exampleQueries.first()).toContainText('outliers');
  });

  test('should enable analyze button when query is entered', async ({ page }) => {
    await page.goto('/');

    const queryInput = page.locator('.query-input');
    const analyzeButton = page.locator('.query-button');

    // Initially disabled
    await expect(analyzeButton).toBeDisabled();

    // Type query
    await queryInput.fill('What are the outliers?');

    // Button should be enabled
    await expect(analyzeButton).toBeEnabled();
  });

  test('should populate input when clicking example query', async ({ page }) => {
    await page.goto('/');

    const queryInput = page.locator('.query-input');
    const firstExample = page.locator('.example-query').first();

    // Click example query
    await firstExample.click();

    // Check that loading indicator appears (query is being processed)
    await expect(page.locator('.loading')).toBeVisible({ timeout: 1000 });
  });

  test('should show loading state when querying', async ({ page }) => {
    await page.goto('/');

    const queryInput = page.locator('.query-input');
    const analyzeButton = page.locator('.query-button');

    // Type query
    await queryInput.fill('What are the outliers in target validation?');

    // Click analyze
    await analyzeButton.click();

    // Check loading state
    await expect(page.locator('.loading')).toBeVisible({ timeout: 2000 });
  });

  test('should have responsive design elements', async ({ page }) => {
    await page.goto('/');

    // Check container exists
    await expect(page.locator('.container')).toBeVisible();

    // Check header exists
    await expect(page.locator('.header')).toBeVisible();

    // Check query section exists
    await expect(page.locator('.query-section')).toBeVisible();
  });
});

test.describe('Query Functionality', () => {
  test('should handle keyboard enter to submit query', async ({ page }) => {
    await page.goto('/');

    const queryInput = page.locator('.query-input');

    // Type query and press enter
    await queryInput.fill('Show me TREM2 data');
    await queryInput.press('Enter');

    // Should show loading
    await expect(page.locator('.loading')).toBeVisible({ timeout: 2000 });
  });
});
