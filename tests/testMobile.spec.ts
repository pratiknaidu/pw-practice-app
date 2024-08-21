import {expect, test} from '@playwright/test'

test('input fields', async({page}) => {
await page.goto('http://localhost:4200/')
await page.locator('.sidebar-toggle').click()
await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()
await page.locator('.sidebar-toggle').click()
    const usingtheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})

    await usingtheGridEmailInput.fill('test@test.com')
    //await page.screenshot({path: 'screenshots/formsLayoutPage.png'})
    await usingtheGridEmailInput.clear()  //clear the text
    await usingtheGridEmailInput.pressSequentially('test2@test.com')   //pressSequentially is used to write sequentially with delay we can add


})