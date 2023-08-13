import { Dialog, DialogTitle, Select, FormControl, Button, InputLabel, MenuItem, TextField, DialogContent, DialogActions, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { TimeField, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { getDayFromHour } from "../utilities"

export const AddBlockDialog = ({ updateBlock, addBlock, open, onClose, blockToEdit, validateTime }) => {
    const [availability, setAvailability] = useState("I'm busy")

    const [activity, setActivity] = useState("")

    const [activityError, setActivityError] = useState(false)

    const [startHour, setStartHour] = useState(dayjs().hour(12).minute(0))

    const [endHour, setEndHour] = useState(dayjs().hour(13).minute(0))

    const [timeError, setTimeError] = useState(false)

    const resetForm = () => {
        setAvailability("I'm busy")
        setActivity("")
        setStartHour(getDayFromHour(6))
        setEndHour(getDayFromHour(7))
        setActivityError(false)
        setTimeError(false)
    }

    const changeAvailability = (newValue) => {
        setAvailability(newValue)
        if (newValue === "I'm available") {
            changeActivity("")
        }
    }

    const changeActivity = (newValue) => {
        const trimmedActivity = newValue.trim()
        setActivity(trimmedActivity)
        if (trimmedActivity.length > 50) {
            setActivityError(true)
        } else {
            setActivityError(false)
        }
    }

    const changeStartHour = (newValue) => {
        let hour = newValue.$H
        if (hour < 6) hour = 6
        setStartHour(dayjs().hour(hour).minute(0))
        setTimeError(false)
    }

    const changeEndHour = (newValue) => {
        let hour = newValue.$H
        if (hour !== 0 && hour < 7) hour = 7
        setEndHour(dayjs().hour(hour).minute(0))
        setTimeError(false)
    }

    const validateStartHour = () => {
        let hour = endHour.hour()
        if (hour !== 0 && startHour.hour() >= hour) {
            setStartHour(dayjs().hour(hour - 1).minute(0))
        }
        setTimeError(false)
    }

    const validateEndHour = () => {
        let hour = startHour.hour()
        if (endHour.hour() <= hour) {
            setEndHour(dayjs().hour(hour + 1).minute(0))
        }
        setTimeError(false)
    }

    const handleSave = () => {
        let newTimeBlock = {
            isFreeTime: availability === "I'm available",
            activity,
            startHour: startHour.hour(),
            endHour: endHour.hour() === 0 ? 24: endHour.hour()
        }
        if (blockToEdit === null) {
            if (addBlock(newTimeBlock) === false) return setTimeError(true)
            onClose()
        } else {
            newTimeBlock.id = blockToEdit.id
            if (updateBlock(newTimeBlock) === false) return setTimeError(true)
            onClose()
        }
    }

    useEffect(() => {
        if (blockToEdit !== null) {
            setAvailability(blockToEdit.isFreeTime ? "I'm available" : "I'm busy")
            setActivity(blockToEdit.activity)
            setStartHour(dayjs().hour(blockToEdit.startHour).minute(0))
            setEndHour(dayjs().hour(blockToEdit.endHour).minute(0))
        }
    }, [blockToEdit])

    useEffect(() => {
        if (blockToEdit === null) {
            resetForm()
        }
    }, [open])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{blockToEdit === null ? "Add to timeline" : "Edit timeline"}</DialogTitle>
                <DialogContent>
                    <FormControl variant="standard" sx={{ width: "100%"}}>
                        <InputLabel>Availability</InputLabel>
                        <Select value={availability} onChange={(evt) => changeAvailability(evt.target.value)}>
                            <MenuItem value="I'm available">I'm available</MenuItem>
                            <MenuItem value="I'm busy">I'm busy</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                {availability === "I'm busy" &&
                <DialogContent>
                    <FormControl
                    sx={{ width: "100%"}}>
                        <TextField
                        error={activityError}
                        helperText={activityError && "Exceeded max character length"}
                        label="What are you doing?"
                        value={activity}
                        onChange={(evt) => changeActivity(evt.target.value)}
                        variant="standard" />
                    </FormControl>
                </DialogContent>
                }
                <DialogContent
                sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                    sx={{ display: "flex", gap: "1rem" }}>
                        <TimeField
                        error={timeError}
                        minTime={dayjs(new Date()).hour(6).minute(0)}
                        maxTime={dayjs(new Date()).hour(23).minute(0)}
                        label="From"
                        format="HH:mm"
                        variant="standard"
                        value={startHour}
                        onChange={changeStartHour}
                        onBlur={validateEndHour}/>
                        <TimeField
                        error={timeError}
                        label="Until"
                        format="HH:mm"
                        variant="standard"
                        value={endHour}
                        onChange={changeEndHour}
                        onBlur={validateStartHour}/>
                    </Box>
                    <Typography
                    variant="caption"
                    color="error">
                        {timeError && "You have something else scheduled during this time"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                    sx={{ bgcolor: "#1e556b"}}
                    disabled={activityError || timeError}
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    )
}
