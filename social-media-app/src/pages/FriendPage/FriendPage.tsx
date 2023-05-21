import React, { FC, useState } from "react"
import { Box, Button, TextField, Typography, useTheme } from "@mui/material"
import StandardContainer from "../../containers/StandardContainer"
import { Chat } from "../../types/chat"
import ChatMessage from "../../components/ChatMessage"
// @ts-ignore
import profileImage from "../../assets/placeholders/profile-placeholder.jpg"

export interface FriendPageProps {
  currentUsername: string
  friendUsername: string
  friendCharacter: string
  chatHistory: Array<Chat>
  onSend: (message: string) => void
}

const FriendPage: FC<FriendPageProps> = ({
  currentUsername,
  friendCharacter,
  friendUsername,
  chatHistory,
  onSend
}) => {
  const theme = useTheme()

  const [message, setMessage] = useState("")

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StandardContainer
        sx={{
          flex: 1,
          p: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.dark",
            paddingX: 2.5,
            paddingY: 1
          }}
        >
          <Typography variant={"h5"} color={"primary.extraLight"}>
            {friendCharacter}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            paddingX: 2,
            paddingY: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": { width: 0 }
          }}
        >
          {chatHistory.map(
            ({ id, content, sender: { username: senderName } }) => (
              <Box key={id} sx={{ paddingY: 2 }}>
                <ChatMessage
                  profileImage={profileImage}
                  content={content}
                  isOwnMessage={senderName === currentUsername}
                />
              </Box>
            )
          )}
        </Box>
        <Box
          sx={{
            boxShadow: `0px 0px 7px 4px ${theme.palette.bg.shadow}`
          }}
        >
          <TextField
            multiline
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              "& textarea::-webkit-scrollbar": {
                width: 0,
                height: 0
              }
            }}
          />
          <Box
            sx={{
              paddingX: 2,
              pb: 2,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button
              sx={{ p: 0 }}
              onClick={() => {
                onSend(message)
                setMessage("")
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </StandardContainer>
    </Box>
  )
}

export default FriendPage
