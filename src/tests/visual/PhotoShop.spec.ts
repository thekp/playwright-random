import { expect, test } from '@playwright/test';
import { setupPage } from '../../pages/PhotoShopPage';

test.describe('Adobe PhotoShop Page Tests', () => {
	test('Visual regression of each section', async ({ page }, textInfo) => {
		await setupPage(page);

		await page.waitForTimeout(5000);

		const pageSections = await page.locator('div[id="root_content_position"] > div > div');

		if (textInfo.project.name === 'iPhone XR') {
			if (await pageSections.isVisible) {
				await expect(await page.screenshot({ fullPage: true })).toMatchSnapshot();
			}
			return;
		}

		for (const pageSection of await pageSections.all()) {
			if (await pageSection.isVisible) {
				await expect(
					await pageSection.screenshot({
						animations: 'disabled',
						mask: [page.locator('header[id="feds-topnav"]')],
					}),
				).toMatchSnapshot({
					threshold: 0.7,
					maxDiffPixelRatio: 0.01,
				});
			}
		}
	});
});
