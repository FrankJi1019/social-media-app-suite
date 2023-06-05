import React, { FC, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { ModalProps } from "../../types/props"
import StandardModalElement from "../../containers/StandardModalElement"

export interface ReportModalProps extends ModalProps {
  content: string
  onSubmit: (reason: string) => void
}

const ReportModal: FC<ReportModalProps> = ({ content, onClose, onSubmit }) => {
  const [reason, setReason] = useState("")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: {
          xs: "90%",
          md: "50%"
        }
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
            value={reason}
            placeholder={"Enter the reason..."}
            onChange={(e) => setReason(e.target.value)}
            sx={{ backgroundColor: "grey.300" }}
          />
        </StandardModalElement>
        <StandardModalElement
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant={"outlined"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(reason)} sx={{ ml: 1 }}>
            Submit
          </Button>
        </StandardModalElement>
      </Box>
    </Box>
  )
}

export default ReportModal
