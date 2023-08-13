import { Slider } from "@mui/material"
import { formatHour } from "../utilities"
import { useEffect, useRef, useState } from "react"

export const ActiveSlider = ({ values, isFreeTime, onChange }) => {
    const color = isFreeTime ? "#9abdcb" : "#1e556b"

    return (
        <Slider
        sx={{ height: "5px", position: "absolute", left: "0", right: "0", bottom: "50%", transform: "translateY(50%)", color: "transparent", zIndex: "1", "& .MuiSlider-thumb": { color }, "& .MuiSlider-track": { color }}}
        min={6}
        max={24}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={value=> formatHour(value)}
        disableSwap
        size="small"
        value={values}
        onChange={onChange} />
    )
}