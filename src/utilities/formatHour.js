import { getDayFromHour } from "./getDayFromHour"

export const formatHour = (hour) => {
    const date = getDayFromHour(hour)
    return date.format("HH:mm")
}
