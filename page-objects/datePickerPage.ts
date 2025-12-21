import {expect, Page} from "@playwright/test"
import {HelperBase} from "./helperBase";

export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async selectCommonDatePickerDateFromToday(numberOfDays: number) {
        const calendarInputField = this.page.getByPlaceholder("Form Picker")
        await calendarInputField.click()
        const dateToAssert: string = await this.selectDateInCalendar(numberOfDays)

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDay: number, endDay: number) {
        const calendarInputField = this.page.getByPlaceholder("Range Picker")
        await calendarInputField.click()

        const startDateToAssert: string = await this.selectDateInCalendar(startDay)
        const endDateToAssert: string = await this.selectDateInCalendar(endDay)

        const fullRangeToAssert: string = `${startDateToAssert} - ${endDateToAssert}`

        await expect(calendarInputField).toHaveValue(fullRangeToAssert)
    }

    private async selectDateInCalendar(numberOfDays: number) {
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

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return dateToAssert
    }
}
