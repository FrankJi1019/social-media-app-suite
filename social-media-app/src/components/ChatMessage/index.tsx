import React, { FC } from "react"
import { Avatar, Box, Typography } from "@mui/material"

export interface ChatMessageProps {
  profileImage: string
  content: string
  isOwnMessage: boolean
}

const ChatMessage: FC<ChatMessageProps> = ({
  profileImage,
  content,
  isOwnMessage
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isOwnMessage ? "row-reverse" : "row"
      }}
    >
      <Avatar src={profileImage} />
      <Box
        sx={{
          p: 1,
          marginX: 0.5,
          backgroundColor: isOwnMessage ? "primary.dark" : "primary.extraLight",
          color: isOwnMessage ? "primary.extraLight" : "primary.dark",
          borderRadius: "10px"
        }}
      >
        <Typography>{content}</Typography>
      </Box>
    </Box>
  )
}

export default ChatMessage
