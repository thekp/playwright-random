import { expect, test } from '@playwright/test';

const buyNowHrefRegex = /(\/commerce\.adobe\.com\/store\/commitment)|(\/www\.adobe\.com\/creativecloud\/plans\.html)|(#)/;

test.describe('Adobe PhotoShop Page Tests', () => {
	test('Verify "Buy Now" links on the page have a href', async ({ page }) => {
		test.step('Navigate to the page and close modals', async () => {
			await page.route('https://www.adobe.com/etc/dexter.hawks/public/localeContent.model.json', async (route) => {
				await route.abort();
			});
			await page.goto('https://www.adobe.com/products/photoshop.html');
			await page.getByRole('button', { name: 'Close' }).click();
		});

		for (const buyNowLink of await page.locator('a[daa-ll="Buy now"]').all()) {
			if (await buyNowLink.isVisible()) {
				expect(buyNowLink).toHaveAttribute('href', buyNowHrefRegex);
			}
		}

		for (const buyNowLink of await page.locator('a[daa-ll="Buy now-1"]').all()) {
			if (await buyNowLink.isVisible()) {
				expect(buyNowLink).toHaveAttribute('href', buyNowHrefRegex);
			}
		}
	});

	test.only('Visual regression of each section', async ({ page }) => {
		test.step('Navigate to the page and close modals', async () => {
			await page.route('https://www.adobe.com/etc/dexter.hawks/public/localeContent.model.json', async (route) => {
				await route.abort();
			});
			await page.goto('https://www.adobe.com/products/photoshop.html');
			await page.getByRole('button', { name: 'Close' }).click();
		});

		await page.waitForTimeout(5000);
		const pageSections = await page.locator('div[id="root_content_position"] > div > div');

		for (const pageSection of await pageSections.all()) {
			if (await pageSection.isVisible) {
				await expect(await pageSection.screenshot()).toMatchSnapshot();
			}
		}
	});
});
