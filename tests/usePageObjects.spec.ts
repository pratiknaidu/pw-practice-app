import{test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import{NavigationPage} from '../page-objects/navigationPage'
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
// import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach( async({page}) => {
    await page.goto('http://localhost:4200/')

})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    //const navigate = new NavigationPage(page)
    await pm.navigation().formLayoutsPage()   //navigate replace it with PageManager Object
    await pm.navigation().datepickerPage()


})

test('parametorized methods', async({page}) => {
    // const navigate = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatePickerPage = new DatePickerPage(page)
    const pm = new PageManager(page)

    await pm.navigation().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test1@test.com', 'Welcome1', 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Elon Musk', 'elonmusk@X.com', true)
    await pm.navigation().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(7)
})
