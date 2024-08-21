import {expect, test} from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach( async({page}) => {

    await page.goto('http://localhost:4200/')
    
})

test.describe.only('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })

test('input fields @smoke', async({page}) => {
    const usingtheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})

    await usingtheGridEmailInput.fill('test@test.com')
    await page.screenshot({path: 'screenshots/formsLayoutPage.png'})
    await usingtheGridEmailInput.clear()  //clear the text
    await usingtheGridEmailInput.pressSequentially('test2@test.com',{delay: 500})   //pressSequentially is used to write sequentially with delay we can add

    //Generic Assertion

    const inputValue = await usingtheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')
    
})

test('radio buttons', async({page}) => {

    const usingtheGridRadio = page.locator('nb-card', {hasText: 'Using the Grid'})
    await usingtheGridRadio.getByLabel('Option 1').check({force: true})
                                //Or
    await usingtheGridRadio.getByRole('radio', {name: 'Option 1'}).check({force: true})                            

    const radioStatus = await usingtheGridRadio.getByLabel('Option 1').isChecked()
    expect(radioStatus).toBeTruthy()

    // await usingtheGridRadio.getByRole('radio', {name: 'Option 2'}).check({force: true})
    // const radiostatus = await usingtheGridRadio.getByRole('radio', {name: 'Option 1'}).isChecked()
    // const radioStatus1 = await usingtheGridRadio.getByRole('radio' , {name: 'Option2'}).isChecked()
    // expect(radioStatus).toBeFalsy()
    // expect(radioStatus1).toBeTruthy()    
})

})

test('checkBoxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    //using for loop to select all checkbox

    const allboxes = page.getByRole('checkbox')
    for(const box of await allboxes.all())
    {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('list and dropdowns', async({page}) => {
     const dropdowns = page.locator('ngx-header nb-select')
     await dropdowns.click()

     const optionList = page.locator('nb-option-list nb-option')
     await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
     await optionList.filter({hasText: "Cosmic"}).click()

     const header = page.locator('nb-layout-header')
     await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

})

test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTip = page.locator('nb-card',{hasText: "Tooltip Placements"})
    await toolTip.getByRole('button', {name: "Top"}).hover()

})

test('dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Listener to delete the pop-up which appears

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()

    })

    await page.locator('table tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()

    //await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
})

test('web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //first get the row by any test in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //second get  the row based on value in the specififc column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowbyId = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowbyId.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()

    //third test filter of the table

    const ages = ["20", "30", "40", "200"]
    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
    }

})

test('datepicker', async({page}) => {

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    let date =new Date()
    date.setDate(date.getDate() + 1)
    const expectedDate = date.getDate().toString()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    //expect(calendarInput).toHaveValue('Aug 1, 2024')
})

test('sliders', async({page}) => {
    // First Method Update Attribute
    // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    // //Javascript evaluation using evaluate

    // await tempGauge.evaluate( node => {
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')

    // })
    // await tempGauge.click()
    
    //Second Method using mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y) 
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100) //this move x+100,y+100 will move downward direction of x & y co-ordinate
    await page.mouse.up()  // this up will relase mouse action
    

})