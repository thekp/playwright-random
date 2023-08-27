import { expect, test } from '@playwright/test';
import { setupPage } from '../../pages/PhotoShopPage';

const buyNowHrefRegex = /(\/commerce\.adobe\.com\/store\/commitment)|(\/www\.adobe\.com\/creativecloud\/plans\.html)|(#)|("")/;

test.describe('Adobe PhotoShop Page Tests', () => {
	test('Verify "Buy Now" links on the page have a href', async ({ page }) => {
		await setupPage(page);

		await page.waitForTimeout(5000);

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
});
