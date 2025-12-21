import { Page } from "@playwright/test"

// Manages common functionality between page objects
export class HelperBase {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForNumberOfSeconds(timeInSec: number) {
        await this.page.waitForTimeout(timeInSec * 1000);
    }
}
