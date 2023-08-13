import { Tooltip, Typography, Popper, Card, ButtonGroup, Button, Box } from "@mui/material"
import { formatTooltipTitle, formatHour } from "../utilities"
import { useRef } from "react"

export const TimeBlockButton = ({ startHour, endHour, activity, isFreeTime, onClick, isActive, handleEdit, handleDelete, popperRef }) => {
    const position = (100 / 18) * (startHour - 6)
    const width = (100 / 18) * (endHour - startHour)

    const buttonRef = useRef(null)

    return (
        <>
            <Tooltip
            placement="top"
            arrow
            title={<Typography variant="caption">{formatTooltipTitle(activity, isFreeTime)}</Typography>}>
                <button
                ref={buttonRef}
                onClick={onClick}
                style={{
                    outline: "none",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    left: `${position}%`,
                    width: `${width}%`,
                    padding: "0",
                    margin: "0",
                    height: "2rem",
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    bottom: "50%",
                    borderRadius: "20px",
                    transform: "translateY(50%)",
                    zIndex: isActive ? "1" : "2"
                }}
                >
                    <div
                    style={
                        {
                            height: "5px",
                            backgroundColor: isFreeTime ? "#9abdcb" : "#1e556b",
                            width: "100%"
                        }}/>
                </button>
            </Tooltip>
            <Popper ref={popperRef} sx={{zIndex: "50"}} open={isActive} anchorEl={buttonRef.current} placement="bottom">
                <Card sx={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "1rem" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="overline" sx={{ fontWeight: "bold"}}>{formatTooltipTitle(activity, isFreeTime)}</Typography>
                        <Typography variant="overline">{`${formatHour(startHour)} - ${formatHour(endHour)}`}</Typography>
                    </Box>
                    <ButtonGroup sx={{ gap: "1rem"}}>
                        <Button
                        variant="contained"
                        sx={{ bgcolor: "#1e556b" }}
                        onClick={handleEdit}>Edit</Button>
                        <Button
                        variant="contained"
                        color="warning"
                        sx={{ bgcolor: "#ef7238" }}
                        onClick={handleDelete}>Delete</Button>
                    </ButtonGroup>
                </Card>
            </Popper>
        </>
    )
}
