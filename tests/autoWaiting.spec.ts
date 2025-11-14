import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    // the following tests have a 30 sec. timeout period by default. Change this with timeout in playwright config
    // await successButton.click()

    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    
    // const text = await successButton.textContent()
    // await successButton.waitFor({state: 'attached'})
    // const text = await successButton.allTextContents()
    
    expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})


test('alternate awaits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    // await page.waitForSelector('.bg-succes')

    // wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed (NOT RECOMMENDED)
    // await page.waitForLoadState('networkidle')



    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
})
