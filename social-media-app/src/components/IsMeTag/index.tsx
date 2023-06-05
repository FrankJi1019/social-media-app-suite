import React from "react"
import { Box, Typography } from "@mui/material"

const IsMeTag = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: "primary.light",
        paddingX: 0.8,
        paddingY: 0.1,
        borderRadius: 1.2
      }}
    >
      <Typography variant={"body2"} sx={{ color: "grey.A700" }}>
        me
      </Typography>
    </Box>
  )
}

export default IsMeTag
