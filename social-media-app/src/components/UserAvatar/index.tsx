import { FC } from "react"
import { Avatar, AvatarProps, Box, Typography } from "@mui/material"

export interface UserAvatarProps {
  profile: string
  name: string
  avatarStyle?: AvatarProps["variant"]
  reverseAlign?: boolean
  onClick?: () => void
}

const UserAvatar: FC<UserAvatarProps> = ({
  profile,
  name,
  avatarStyle,
  reverseAlign,
  onClick
}) => {
  return (
    <Box
      onClick={onClick || (() => {})}
      sx={{
        display: "flex",
        flexDirection: reverseAlign ? "row-reverse" : "row",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      <Avatar src={profile} variant={avatarStyle} />
      <Typography variant={"h5"} sx={{ marginX: 1 }}>
        {name}
      </Typography>
    </Box>
  )
}

export default UserAvatar
