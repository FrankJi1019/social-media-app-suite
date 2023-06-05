import React, { FC, useState } from "react"
import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import { ModalProps } from "../../types/props"
// import StandardModalElement from "../../containers/StandardModalElement"
import ImageGrid from "../../components/ImageGrid"

export interface ReportModalProps extends ModalProps {
  content: string
  imageList: Array<string>
  onSubmit: (reason: string) => void
}

const ReportModal: FC<ReportModalProps> = ({
  content,
  imageList,
  onClose,
  onSubmit
}) => {
  const [reason, setReason] = useState("")
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxHeight: {
          xs: "90%",
          md: "65%"
        }
      }}
    >
      <StandardModalElement>
        <Typography variant={"h4"}>Report Moment</Typography>
      </StandardModalElement>
      <StandardModalElement
        sx={{
          overflowY: "auto",
          boxShadow: `0 0 7px 4px ${theme.palette.primary.main}20`,
          paddingX: 1,
          "&::-webkit-scrollbar": {
            width: 10,
            backgroundColor: `${theme.palette.primary.main}20`
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `${theme.palette.primary.main}90`
          }
        }}
      >
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
        <Grid container>
          <Grid item xs={12} md={6}>
            <ImageGrid images={imageList} />
          </Grid>
        </Grid>
      </StandardModalElement>
      <StandardModalElement sx={{ pt: 2 }}>
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
  )
}

const StandardModalElement = styled(Box)({
  paddingTop: "10px",
  paddingBottom: "10px"
})

export default ReportModal
