export const formatTooltipTitle = (activity, isFreeTime) => {
    if (activity !== "") return activity
    if (isFreeTime) return "I'm available"
    return "I'm busy"
}