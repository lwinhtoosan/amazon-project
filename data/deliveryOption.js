import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
]

export function getDeliveryId(deliveryOptionId) {
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
            deliveryOption = option
            }
        })
        return deliveryOption;
        }
function isWeekend(date) {
    const dayOfWeek = date.format('dddd')
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
        }
export function calculateDeliveryOption(deliveryOption) {
    let deliveryDate = dayjs();
    let remainingDay = deliveryOption.deliveryDays
    while (remainingDay > 0) {
        deliveryDate = deliveryDate.add(1 , 'd')
        if (!isWeekend(deliveryDate)) {
            remainingDay--;
        }
    }
    
    const dateString = deliveryDate.format('dddd, MMMM D')
    return dateString;
} 

