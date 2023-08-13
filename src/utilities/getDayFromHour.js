import dayjs from "dayjs"

export const getDayFromHour = (hour) => {
    const day = dayjs().hour(hour % 24).minute(0)
    return day
}
