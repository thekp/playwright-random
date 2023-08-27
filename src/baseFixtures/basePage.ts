import { Page } from '@playwright/test';

export abstract class BasePage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async gotoUrl(url: string): Promise<void> {
		await this.page.goto(url);
	}
}
