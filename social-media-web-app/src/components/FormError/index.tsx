import React, { FC } from "react"
import { Box, Typography } from "@mui/material"

export interface FormErrorProps {
  message: string
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return (
    <Box sx={{ height: "16px" }}>
      <Typography variant={"body2"} color={"error"}>
        {message}
      </Typography>
    </Box>
  )
}

export default FormError
