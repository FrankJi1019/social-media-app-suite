import React, { FC } from "react"
import UserAvatar, { UserAvatarProps } from "../UserAvatar"
import { Box, Button } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"

export interface AuthBlockProps {
  avatarOptions?: UserAvatarProps
  onPostNew?: () => void
  onSignOut?: () => void
  onLogin?: () => void
  onRegister?: () => void
}

const AuthBlock: FC<AuthBlockProps> = ({
  avatarOptions,
  onPostNew,
  onSignOut,
  onLogin,
  onRegister
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        // p: {
        //   xs: 1.5,
        //   md: 3
        // },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        {avatarOptions && (
          <Box
            sx={{
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "primary.main"
            }}
          >
            <UserAvatar {...avatarOptions} />
          </Box>
        )}
        {onPostNew && (
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={onPostNew}
              startIcon={<CreateIcon />}
              variant={"outlined"}
              sx={{ width: "100%" }}
            >
              New Post
            </Button>
          </Box>
        )}
        {onRegister && (
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={onRegister}
              variant={"contained"}
              sx={{ width: "100%" }}
            >
              Register
            </Button>
          </Box>
        )}
        {onLogin && (
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={onLogin}
              variant={"outlined"}
              sx={{ width: "100%" }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
      {onSignOut && (
        <Box>
          <Button
            onClick={onSignOut}
            variant={"outlined"}
            sx={{ width: "100%" }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default AuthBlock
