import { defineConfig, devices, ReporterDescription } from '@playwright/test';

export const reporterLocalMode: ReporterDescription[] = [['list'], ['html', { open: 'always' }]];
export const reporterCIMode: ReporterDescription[] = [
	['list'],
	['junit', { outputFile: './playwright-report/xml/results.xml' }],
	['html', { outputFolder: './playwright-report/html' }],
];
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './src/tests',
	/* Run tests in files in parallel */
	/* Maximum time one test can run for. */
	timeout: (process.env.CI ? 45 : 30) * 1000,
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 2 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? reporterCIMode : reporterLocalMode,
	/* Configure snapshot path: https://playwright.dev/docs/next/api/class-testproject#test-project-snapshot-path-template */
	snapshotPathTemplate: '{testDir}/{testFileDir}/__screenshots__/{arg}{ext}',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: process.env.CI ? 'retain-on-failure' : 'on',
		video: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'Desktop Edge',
			use: { ...devices['Desktop Edge'] },
		},

		{
			name: 'iPhone XR',
			use: { ...devices['iPhone XR'] },
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
