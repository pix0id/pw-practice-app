import { test, expect } from "@playwright/test";
import {PageManager} from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
});

test("navigate to form page", async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test("Parameterized methods", async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitGridFormCredsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineForm('Alex Sollman', 'test2@test2.com', true)
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(4);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(2,5)

})
