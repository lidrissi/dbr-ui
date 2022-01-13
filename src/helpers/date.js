import * as dayjs from 'dayjs'

export const formatDate = (date) => {
    return dayjs(new Date(date)
        .toISOString())
        .format('DD-MM-YYYY')
}

export const dateRangeTypeOptions = [
    { label: 'Last 7 Days', value: 'LAST_7_DAYS' },
    { label: 'Last 30 Days', value: 'LAST_30_DAYS' },
    { label: 'This Month', value: 'THIS_MONTH' },
    { label: 'Last Month', value: 'LAST_MONTH' },
    { label: 'Custom Range', value: 'CUSTOM_RANGE' },
]

export const deductDateRangeFromType = (type) => {
    let startDate = dayjs().toDate()
    let endDate = dayjs().toDate()

    switch (type) {
        case 'LAST_7_DAYS':
            startDate = dayjs().subtract(6, 'days').toDate()
            break;
        case 'LAST_30_DAYS':
            startDate = dayjs().subtract(29, 'days').toDate()
            break;
        case 'THIS_MONTH':
            startDate = dayjs().startOf('month').toDate()
            endDate = dayjs().endOf('month').toDate()
            break;
        case 'LAST_MONTH':
            startDate = dayjs().subtract(1, 'month').startOf('month').toDate()
            endDate = dayjs().subtract(1, 'month').endOf('month').toDate()
            break;

        default:
            break;
    }


    return ({
        startDate,
        endDate
    })

}