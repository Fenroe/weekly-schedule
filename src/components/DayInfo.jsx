import { Box, IconButton,Typography } from "@mui/material"
import { BiPlus } from "react-icons/bi"
import { useEffect, useRef, useState } from "react"
import { RailSlider } from "./RailSlider"
import { ActiveSlider } from "./ActiveSlider"
import { AddBlockDialog } from "./AddBlockDialog"
import { TimeBlockButton } from "./TimeBlockButton"
import { getDefaultTimeBlocks } from "../utilities"

export const DayInfo = ({ day }) => {
    const [timeBlocks, setTimeBlocks] = useState(getDefaultTimeBlocks(day))

    const [activeBlock, setActiveBlock] = useState(null)

    const [showEventModal, setShowEventModal] = useState(false)

    const [timeBlockToEdit, setTimeBlockToEdit] = useState(null)

    const sliderRef = useRef(null)

    const popperRef = useRef(null)

    const getSortedBlocks = () => {
        timeBlocks.sort((a, b) => a.startHour - b.startHour)
        return timeBlocks
    }

    const checkForBlockConflict = (timeRange) => {
        const [firstValue, secondValue] = timeRange
        for (let i = firstValue; i <= secondValue; i++) {
            for (let j = 0; j < timeBlocks.length; j++) {
                const currentBlock = timeBlocks[j]
                if (currentBlock.id !== activeBlock?.id && currentBlock.startHour === currentBlock.endHour - 1) {
                    if ((currentBlock.startHour >= firstValue) && (currentBlock.endHour <= secondValue)) {
                        return currentBlock
                    }
                } else {
                    if ((!activeBlock || currentBlock.id !== activeBlock?.id) && (!timeBlockToEdit || timeBlockToEdit.id !== currentBlock.id) && i > currentBlock.startHour && i < currentBlock.endHour) {
                        return currentBlock
                    }
                }
            }
        }
        return null
    }

    const handleTopSliderClick = () => {
        setShowEventModal(true)
    }

    const handleActiveSliderChange = (evt, newValues) => {
        if (newValues[0] === newValues[1]) return
        const foundBlock = checkForBlockConflict(newValues)
        if (foundBlock === null) {
            setActiveBlock((prevState) => ({
                ...prevState,
                startHour: newValues[0],
                endHour: newValues[1]
            }))
        }
    }

    const saveActiveBlock = () => {
        setTimeBlocks((prevTimeBlocks) => {
            const filteredBlocks = prevTimeBlocks.filter((timeBlock) => timeBlock.id !== activeBlock.id)
            return [...filteredBlocks, activeBlock]
        })
    }

    const addTimeBlock = (newBlock) => {
        let id = 1
        if (timeBlocks.length > 0) {
            if (checkForBlockConflict([newBlock.startHour, newBlock.endHour]) !== null) {
                return false
            }
            timeBlocks.sort((a, b) => a.id - b.id)
            const lastId = timeBlocks[timeBlocks.length - 1].id
            id = (lastId + 1)
        }
        newBlock.id = id
        setTimeBlocks([...timeBlocks, newBlock])
    }

    const editTimeBlock = (timeBlock) => {
        setActiveBlock(null)
        setTimeBlockToEdit(timeBlock)
        setShowEventModal(true)
    }

    const updateTimeBlock = (timeBlock) => {
        if (checkForBlockConflict([timeBlock.startHour, timeBlock.endHour]) !== null) return false
        const filteredTimeBlocks = timeBlocks.filter((block) => block.id !== timeBlock.id)
        setTimeBlocks([...filteredTimeBlocks, timeBlock])
    }

    const deleteTimeBlock = () => {
        setTimeBlocks([...timeBlocks.filter((timeBlock) => timeBlock.id !== activeBlock?.id)])
    }

    useEffect(() => {
        const handleKeyDown = (evt) => {
            if (evt.key === "Escape") {
                setActiveBlock(null)
            }
            if (evt.key === "Backspace") {
                deleteTimeBlock()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [activeBlock])

    useEffect(() => {
        const checkForOutsideClick = (evt) => {
            if (sliderRef.current && !sliderRef.current.contains(evt.target) && popperRef.current && !popperRef.current.contains(evt.target)) {
                setActiveBlock(null)
            }
        }

        document.addEventListener("mousedown", checkForOutsideClick)

        return () => document.removeEventListener("mousedown", checkForOutsideClick)
    }, [])

    useEffect(() => {
        // Any time the active time block is updated we save the changes to the array
        if (activeBlock !== null) {
            saveActiveBlock()
        }
    }, [activeBlock])

    useEffect(() => {
        // Reset the active time block if it was removed from the array
        if (activeBlock !== null && timeBlocks.filter((timeBlock) => timeBlock.id === activeBlock.id).length === 0) {
            setActiveBlock(null)
        }
    }, [timeBlocks])

    useEffect(() => {
        // Clear edited time block when we close the modal
        if (showEventModal === false) {
            setTimeBlockToEdit(null)
        }
    }, [showEventModal])

    return (
        <Box display="flex" alignItems="center" gap="1rem" maxWidth="100%">
            <Box display="flex" alignItems="center" sx={{ width: "5rem" }}>
                <Typography variant="overline">{day}</Typography>
            </Box>
            <Box flex="1" position="relative" ref={sliderRef}>
                <RailSlider
                onChange={handleTopSliderClick}/>
                {getSortedBlocks().map((timeBlock) =>
                <TimeBlockButton
                key={timeBlock.id}
                startHour={timeBlock.startHour}
                endHour={timeBlock.endHour}
                activity={timeBlock.activity}
                isFreeTime={timeBlock.isFreeTime}
                isActive={activeBlock !== null && timeBlock.id === activeBlock.id}
                onClick={() => setActiveBlock(timeBlock)}
                handleEdit={() => editTimeBlock(timeBlock)}
                handleDelete={() => deleteTimeBlock(timeBlock)}
                popperRef={popperRef}
                />)}
                {activeBlock !== null &&
                <ActiveSlider
                values={[activeBlock.startHour, activeBlock.endHour]}
                isFreeTime={activeBlock.isFreeTime}
                onChange={handleActiveSliderChange}
                />}
            </Box>
            <Box>
                <IconButton
                sx={{ color: "#1e556b" }}
                onClick={() => setShowEventModal(true)}>
                    <BiPlus />
                </IconButton>
            </Box>
            <AddBlockDialog
            validateTime={checkForBlockConflict}
            updateBlock={updateTimeBlock}
            addBlock={addTimeBlock}
            blockToEdit={timeBlockToEdit}
            open={showEventModal}
            onClose={() => setShowEventModal(false)} />
        </Box>
    )
}
