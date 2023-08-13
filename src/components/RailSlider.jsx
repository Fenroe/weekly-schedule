import { Slider } from "@mui/material"
import { formatHour } from "../utilities"

export const RailSlider = ({ onChange }) => {
    const marks = [
        {
            value: 6,
            label: formatHour(6)
        },
        {
            value: 12,
            label: formatHour(12)
        },
        {
            value: 18,
            label: formatHour(18)
        },
        {
            value: 24,
            label: formatHour(24)
        }
    ]
    return (
        <Slider
        sx={{ height: "2px", position: "absolute", left: "0", right: "0", transform: "translateY(-50%)",  "& .MuiSlider-thumb": { display: "none" } }}
        min={6}
        max={24}
        step={1}
        size="small"
        marks={marks}
        onClick={onChange}
        value={[6]}/>
    )
}