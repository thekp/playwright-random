import { expect, test } from '@playwright/test';

test.describe('Adobe PhotoShop Page Tests', () => {
	test('has title', async ({ page }) => {
		await page.route('https://www.adobe.com/etc/dexter.hawks/public/localeContent.model.json', async (route) => {
			await route.abort();
		});

		await page.goto('https://www.adobe.com/products/photoshop.html');

		await page.getByRole('button', { name: 'Close' }).click();

		for (const buyNowLink of await page.locator('a[daa-ll="Buy now"]').all()) {
			if (await buyNowLink.isVisible()) {
				expect(buyNowLink).toHaveAttribute('href', /(\/commerce\.adobe\.com\/store\/commitment)|(\/www\.adobe\.com\/creativecloud\/plans\.html)/);
			}
		}

		for (const buyNowLink of await page.locator('a[daa-ll="Buy now-1"]').all()) {
			if (await buyNowLink.isVisible()) {
				expect(buyNowLink).toHaveAttribute('href', /(\/commerce\.adobe\.com\/store\/commitment)|(\/www\.adobe\.com\/creativecloud\/plans\.html)/);
			}
		}
	});
});
