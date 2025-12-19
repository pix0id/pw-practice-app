import {expect, Page} from "@playwright/test"

export class DatePickerPage{

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCommonDatePickerDateFromToday(numberOfDays: number) {
        const calendarInputField = this.page.getByPlaceholder("Form Picker")
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + numberOfDays)
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString("En-US", {month: 'short'})
        const expectedMonthLong = date.toLocaleString("En-US", {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthYear = `${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthYear.includes(expectedMonthYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }
}
