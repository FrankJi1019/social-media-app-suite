import React, { FC } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { ModalProps } from "../../types/props"
import StandardModalElement from "../../containers/StandardModalElement"

export interface ReportModalProps extends ModalProps {
  content: string
}

const ReportModal: FC<ReportModalProps> = ({ content, onClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      }}
    >
      <Box>
        <StandardModalElement>
          <Typography variant={"h4"}>Report Moment</Typography>
        </StandardModalElement>
        <StandardModalElement>
          <Typography
            sx={{
              color: "grey.A700",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              whiteSpace: "pre-wrap"
            }}
          >
            {content}
          </Typography>
        </StandardModalElement>
      </Box>
      <Box>
        <StandardModalElement>
          <TextField
            placeholder={"Enter the reason..."}
            sx={{ backgroundColor: "grey.300" }}
          />
        </StandardModalElement>
        <StandardModalElement
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant={"outlined"} onClick={onClose}>
            Cancel
          </Button>
          <Button sx={{ ml: 1 }}>Submit</Button>
        </StandardModalElement>
      </Box>
    </Box>
  )
}

export default ReportModal
