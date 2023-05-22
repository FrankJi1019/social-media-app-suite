import React, { FC, useState } from "react"
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import StandardContainer from "../../containers/StandardContainer"
import { Chat } from "../../types/chat"
import ChatMessage from "../../components/ChatMessage"
// @ts-ignore
import profileImage from "../../assets/placeholders/profile-placeholder.jpg"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

export interface FriendPageProps {
  currentUsername: string
  friendUsername: string
  friendCharacter: string
  chatHistory: Array<Chat>
  onSend: (message: string) => void
  onBack: () => void
}

const FriendPage: FC<FriendPageProps> = ({
  currentUsername,
  friendCharacter,
  chatHistory,
  onSend,
  onBack
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
            paddingY: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box sx={{ flex: 1 }}>
            <IconButton onClick={onBack}>
              <ArrowBackIosNewIcon
                fontSize={"small"}
                sx={{ color: "primary.extraLight" }}
              />
            </IconButton>
          </Box>
          <Typography variant={"h5"} color={"primary.extraLight"}>
            {friendCharacter}
          </Typography>
          <Box sx={{ flex: 1 }} />
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSend(message)
              setMessage("")
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
              <Button type={"submit"} sx={{ p: 0 }}>
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </StandardContainer>
    </Box>
  )
}

export default FriendPage
