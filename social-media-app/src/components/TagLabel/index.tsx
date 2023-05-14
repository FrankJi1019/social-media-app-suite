import React, { FC } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export interface TagLabelProps {
  tag: string
  onRemove: (tag: string) => void
}

const TagLabel: FC<TagLabelProps> = ({ tag, onRemove }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        paddingX: 1.5,
        paddingY: 0.3,
        borderRadius: "5px",
        color: "primary.dark",
        cursor: "default",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Typography variant={"body2"}># {tag} </Typography>
      <CloseIcon
        onClick={() => onRemove(tag)}
        sx={{
          fontSize: theme.typography.body2.fontSize,
          ml: 0.5,
          cursor: "pointer"
        }}
      />
    </Box>
  )
}

export default TagLabel
