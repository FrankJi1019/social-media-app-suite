import React, { FC, ReactNode } from "react"
import { Box, SxProps, useTheme } from "@mui/material"

export interface StandardContainerProps {
  children: ReactNode
  sx?: SxProps
}

const StandardContainer: FC<StandardContainerProps> = ({
  children,
  sx = {}
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        borderRadius: "15px",
        backgroundColor: "bg.secondary",
        boxShadow: `0 8px 24px 0px ${theme.palette.bg.shadow}`,
        overflow: "auto",
        p: {
          xs: 1.5,
          md: 3
        },
        "&::-webkit-scrollbar": {
          width: 0,
          height: 0,
          borderRadius: "1000px",
          backgroundColor: `${theme.palette.primary.main}20`
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `${theme.palette.primary.main}20`,
          borderRadius: "1000px"
        },
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export default StandardContainer
