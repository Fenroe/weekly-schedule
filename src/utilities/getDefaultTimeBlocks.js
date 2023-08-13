import { defaultTimeBlocks } from "../data"

export const getDefaultTimeBlocks = (day) => {
    switch (day) {
        case "Sat":
            return defaultTimeBlocks.saturday
        case "Sun":
            return defaultTimeBlocks.sunday
        default:
            return defaultTimeBlocks.weekdays
    }
}
