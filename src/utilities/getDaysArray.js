import dayjs from "dayjs"
import { dayMap } from "../data"

// used to generate a list of days in the correct order
export const getDaysArray = () => {
    const days = []
    const currentDay = dayjs().day()
    for (let i = currentDay; i < currentDay + 7; i++) {
        const adjustedDay = i % 7
        days.push(dayMap.get(adjustedDay))
    }
    return days
}