import {Locator, Page} from "@playwright/test"
import {HelperBase} from "./helperBase";

export class FormLayoutPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async submitGridFormCredsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm: Locator = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole("radio", {name: optionText}).check({force: true})

        await usingTheGridForm.getByRole('button').click()
    }

    async submitInlineForm(name: string, email: string, rememberMe: boolean) {
        const inlineForm: Locator = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)

        if (rememberMe) {
            await inlineForm.getByRole("checkbox").check({force: true})
            await inlineForm.getByRole("button").click()
        }
    }
}
