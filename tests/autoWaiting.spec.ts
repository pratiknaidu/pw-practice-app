import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {

    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton =  page.locator('.bg-success')
    await successButton.click()

    //waiting

    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    //await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})

})

test.skip('alternative wait', async({page}) => {
    const successButton =  page.locator('.bg-success')
    //wait for element
    // await page.waitForSelector('.bg-success')   //first example

    //Wait for particular response  second example using response from network tab
    await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
        

})

