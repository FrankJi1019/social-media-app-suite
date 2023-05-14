import React, { FC, ReactNode } from "react"
import { Box, SxProps } from "@mui/material"

interface StandardFormContainerProps {
  children: ReactNode
  onSubmit: (e: any) => void
  sx?: SxProps
}

const StandardFormContainer: FC<StandardFormContainerProps> = ({
  children,
  onSubmit,
  sx = {}
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <Box sx={{ "&>div.MuiBox-root": { mb: 4 }, ...sx }}>{children}</Box>
    </form>
  )
}

export default StandardFormContainer
