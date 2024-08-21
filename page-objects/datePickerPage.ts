import { Page } from "@playwright/test";

export class DatePickerPage{

    private readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async selectCommonDatePickerFromToday(numberofDaysFromToday: number)
    {
        const calendarInput = this.page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    let date =new Date()
    date.setDate(date.getDate() + numberofDaysFromToday)
    const expectedDate = date.getDate().toString()

    await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    }
}