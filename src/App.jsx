import { Stack, Container, Paper, Typography } from "@mui/material"
import { DayInfo } from "./components"
import { getDaysArray } from "./utilities"

function App() {
    return (
        <Container>
            <Paper sx={{ p: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: "700", color: "#ef7238"}}>My schedule this week</Typography>
                <Stack gap="1rem">
                    {getDaysArray().map((day) =>
                    <DayInfo key={day} day={day}/>)}
                </Stack>
            </Paper>
        </Container>

    )
}

export default App
