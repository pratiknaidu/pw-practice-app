import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

//page represents pretty much of the blank page of the browser

test('Locator syntax rules' , async ({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //By Class Value
    page.locator('.shape-rectangle')

    //By attribute
    page.locator('[placeholder="Email"]')

    //By full Class value
    page.locator('["input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //By XPath
    page.locator('//input[@id="inputEmail1"]')

    //By Partial text match
    page.locator(':text["Using"]')

    //By exact Text match
    page.locator(':text-is["Using the Grid"]')
    
})

test('user facing locators mimic', async({page}) => {
    await page.getByRole('textbox',{name :"Email"}).first().click()
    await page.getByRole('button',{name :"Sign in"}).first().click()


    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    //await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card nb-radio :text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

})

test('locating parent elements', async({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name :"Email"}).click()  //First method 'text' method

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name :"Email"}).click()  //Second Method using 'filter'


    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name : "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox',{name :"Email"}).click()

    await page.locator('nb-card', {hasText: "Horizontal form"}).getByRole('textbox',{name: "Password"}).click()

})

test('reusing the locators', async({page}) => {

    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name :"Email"}).fill('test@test.com')
    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name :"Password"}).fill('test@123')  //Second Method
    //                                         //Or You can use this
    // //await page.locator('nb-card',{hasText: "Basic form"}).getByRole('textbox',{name :"Password"}).fill('test@123')  //First Method
    // await page.locator('nb-card',{hasText: "Basic form"}).getByRole('button').click()

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})   //reformatted code so that page.locator will not be repeated

    await basicForm.getByRole('textbox',{name :"Email"}).fill('test@test.com')
    await basicForm.getByRole('textbox',{name :"Password"}).fill('test@123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()


})

test('extracting values', async({page}) => {
    //extract single text
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')


    //all textvalues

    const allRadioButtontext = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtontext).toContain("Option 1")

    //Input field
    const emailField = basicForm.getByRole('textbox',{name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()   //Inputvalue will retrun text
     expect(emailValue).toEqual('test@test.com')

     const passwordField = basicForm.getByRole('textbox',{name: "Password"})
     await passwordField.fill('test@123')
     const passwValue = await passwordField.inputValue()    //Inputvalue will retrun text
     expect(passwValue).toEqual('test@123')

})

test('assertions', async ({page}) => {
    //General Assertions
    const value = 5
    expect(value).toEqual(5)

    //Another example of General assertion

    const basicFormPage = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const text = await basicFormPage.textContent()
    expect(text).toEqual('Submit')

    //Locator Assertions

    await expect(basicFormPage).toHaveText('Submit')

    //Soft Assertions

    await expect.soft(basicFormPage).toHaveText('Submit5')
    await basicFormPage.click()





})