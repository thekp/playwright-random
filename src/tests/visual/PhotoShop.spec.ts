import { expect, test } from '@playwright/test';
import { setupPage } from '../../pages/PhotoShopPage';

test.describe('Adobe PhotoShop Page Tests', () => {
	test('Visual regression of each section', async ({ page }, textInfo) => {
		await setupPage(page);

		// TODO replace timeout with an assertion of a component that is guaranteed to be on the page
		await page.waitForTimeout(5000);

		const pageSections = await page.locator('div[id="root_content_position"] > div > div');

		// Note: Faced a bug on iPhone XR where it couldn't take a screenshot of a large component
		// So workaround is to just take a screenshot of the whole page
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
