import { expect, test } from '@playwright/test';
import { setupPage } from '../../pages/PhotoShopPage';

const buyNowHrefRegex = /(\/commerce\.adobe\.com\/store\/commitment)|(\/www\.adobe\.com\/creativecloud\/plans\.html)|(#)|("")/;

test.describe('Adobe PhotoShop Page Tests', () => {
	test('Verify "Buy Now" links on the page have a href', async ({ page }) => {
		await setupPage(page);

		// TODO replace timeout with an assertion of a component that is guaranteed to be on the page
		await page.waitForTimeout(5000);

		// Alternative, could have gotten the text by "Buy now" and then used that to get the href
		// Didn't want to click on the link because it would take me to a different page
		// Maybe can just make a http request to the href and check the status code
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
