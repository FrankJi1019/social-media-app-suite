import React, { FC } from "react"
import { Box, Button, TextField, Typography, useTheme } from "@mui/material"
import StandardContainer from "../../containers/StandardContainer"

export interface FriendPageProps {
  friendUsername: string
  friendCharacter: string
  chatHistory: Array<any>
  onSend: (message: string) => void
}

const FriendPage: FC<FriendPageProps> = ({
  friendCharacter,
  friendUsername,
  chatHistory,
  onSend
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StandardContainer
        sx={{
          flex: 1,
          p: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
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
        <Box sx={{ flex: 1 }}></Box>
        <Box
          sx={{
            boxShadow: `0px 0px 7px 4px ${theme.palette.bg.shadow}`
          }}
        >
          <TextField
            multiline
            rows={2}
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
            <Button sx={{ p: 0 }}>Send</Button>
          </Box>
        </Box>
      </StandardContainer>
    </Box>
  )
}

export default FriendPage
