import React, { FC } from "react"
import { Box, Typography } from "@mui/material"

export interface TimeLabelProps {
  time: string
}

const TimeLabel: FC<TimeLabelProps> = ({ time }) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.A400",
        borderRadius: "5px",
        paddingX: 0.5,
        paddingY: 0.1
      }}
    >
      <Typography variant={"body2"} sx={{ color: "primary.extraLight" }}>
        {time}
      </Typography>
    </Box>
  )
}

export default TimeLabel
