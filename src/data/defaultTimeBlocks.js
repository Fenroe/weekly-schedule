export const defaultTimeBlocks = {
    weekdays: [
        {
            id: 0,
            startHour: 9,
            endHour: 17,
            isFreeTime: false,
            activity: "Work"
        },
        {
            id: 1,
            startHour: 18,
            endHour: 22,
            isFreeTime: true,
            activity: ""
        },
    ],
    saturday: [
        {
            id: 0,
            startHour: 9,
            endHour: 12,
            isFreeTime: false,
            activity: "Doing laundry"
        },
        {
            id: 1,
            startHour: 15,
            endHour: 24,
            isFreeTime: true,
            activity: ""
        },
    ],
    sunday: [
        {
            id: 0,
            startHour: 11,
            endHour: 19,
            isFreeTime: false,
            activity: ""
        },
    ]
}