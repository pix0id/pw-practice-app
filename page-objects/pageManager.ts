import {Page, expect} from "@playwright/test"
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutsPage";
import {DatePickerPage} from "./datePickerPage";

// manages all page objects, making our tests files cleaner
export class PageManager {

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly datePickerPage: DatePickerPage;
    private readonly formLayoutsPage: FormLayoutPage;

    constructor(page: Page) {
        this.page = page;

        // call this.page instead of just page to pass the page fixture related to the page
        // object manager. This ensures we cascade the page passed to the POM to the
        // navigation/datepicker/form layout/etc. page.
        this.navigationPage = new NavigationPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
        this.formLayoutsPage = new FormLayoutPage(this.page);
    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutsPage () {
        return this.formLayoutsPage
    }

    onDatePickerPage () {
        return this.datePickerPage;
    }
}
