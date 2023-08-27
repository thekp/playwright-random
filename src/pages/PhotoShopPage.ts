import { expect, test } from '@playwright/test';

export const setupPage = async (page: any) => {
	await test.step('Navigate to the page and close modals', async () => {
		await page.route('https://www.adobe.com/etc/dexter.hawks/public/localeContent.model.json', async (route) => {
			await route.abort();
		});
		await page.goto('https://www.adobe.com/products/photoshop.html');
		await page.getByRole('button', { name: 'Close' }).click();
		await expect(page.locator('div[id="root_content_position"]')).toBeVisible();
	});
};
