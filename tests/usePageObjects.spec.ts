import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutPage } from "../page-objects/formLayoutsPage";
import {DatePickerPage} from "../page-objects/datePickerPage";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200");
});

test("navigate to form page", async ({ page }) => {
    const navigateTo = new NavigationPage(page);

    await navigateTo.formLayoutsPage();
    await navigateTo.datePickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
});

test("Parameterized methods", async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onFormsLayoutsPage = new FormLayoutPage(page);
    const onDatePickerPage = new DatePickerPage(page);

    await navigateTo.formLayoutsPage();
    await onFormsLayoutsPage.submitGridFormCredsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormsLayoutsPage.submitInlineForm('Alex Sollman', 'test2@test2.com', true)

    await navigateTo.datePickerPage();
    await onDatePickerPage.selectCommonDatePickerDateFromToday(4);
    await onDatePickerPage.selectDatePickerWithRangeFromToday(2,5)

})
