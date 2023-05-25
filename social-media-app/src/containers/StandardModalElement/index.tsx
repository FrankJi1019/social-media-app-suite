import React, { FC } from "react"
import { Box } from "@mui/material"
import { ContainerProps } from "../../types/props"

export interface StandardModalElementProps extends ContainerProps {}

const StandardModalElement: FC<StandardModalElementProps> = ({
  children,
  sx = {}
}) => {
  return <Box sx={{ paddingY: 1.5, ...sx }}>{children}</Box>
}

export default StandardModalElement
