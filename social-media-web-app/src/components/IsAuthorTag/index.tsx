import React from "react"
import { Box, Typography } from "@mui/material"

const IsAuthorTag = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: "primary.main",
        paddingX: 0.8,
        paddingY: 0.1,
        borderRadius: 1.2
      }}
    >
      <Typography variant={"body2"} sx={{ color: "grey.200" }}>
        author
      </Typography>
    </Box>
  )
}

export default IsAuthorTag
