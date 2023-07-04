import React, { FC } from "react"
import { Avatar, Box, Typography } from "@mui/material"
import moment from "moment"
import IsMeTag from "../IsMeTag"
import IsAuthorTag from "../IsAuthorTag"

export interface CommentProps {
  profile: string
  character: string
  content: string
  commentDate: Date
  isOwnComment: boolean
  isAuthor: boolean
}

const Comment: FC<CommentProps> = ({
  profile,
  commentDate,
  character,
  content,
  isOwnComment,
  isAuthor
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar src={profile} />
      <Box sx={{ paddingX: { xs: 1, md: 2 } }}>
        <Box
          sx={{
            p: { xs: 1, md: 2 },
            backgroundColor: "primary.extraLight",
            borderRadius: "10px"
          }}
        >
          <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
            {character} {isAuthor && <IsAuthorTag />}{" "}
            {isOwnComment && <IsMeTag />}
          </Typography>
          <Typography sx={{ color: "rgba(0,0,0,.6)" }}>{content}</Typography>
        </Box>
        <Box sx={{ pr: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: "rgba(0,0,0,.4)" }}>
            {moment(commentDate).format("HH:mm DD MMM")}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Comment
