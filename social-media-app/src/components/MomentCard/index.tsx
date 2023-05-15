import React, { FC } from "react"
import { Avatar, Box, styled, Typography } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import FavoriteIcon from "@mui/icons-material/Favorite"
import moment from "moment"
import { MomentBrief } from "../../types/moment"

export interface MomentCardProps {
  moment: MomentBrief
  onOpen: () => void
  onLike: () => void
  onUnlike: () => void
}

const MomentCard: FC<MomentCardProps> = ({
  moment: {
    postDate,
    likeNumber,
    content,
    commentNumber,
    profile,
    character,
    isLiked,
    isOwnMoment
  },
  onLike,
  onOpen,
  onUnlike
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ mr: 1 }}>
        <Avatar src={profile} />
      </Box>
      <Box>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography variant={"h6"} sx={{ fontWeight: "bold", mr: 1 }}>
            {character.name} {isOwnMoment && "(Me)"}
          </Typography>
          <Typography color={"grey"}>
            {moment(postDate).format("HH:mm DD MMM")}
          </Typography>
        </Box>
        <Box
          onClick={() => onOpen()}
          sx={{
            marginY: 0.5,
            cursor: "default",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            whiteSpace: "pre-wrap"
          }}
        >
          <Typography>{content}</Typography>
        </Box>
        <Box sx={{ display: "flex", mt: 1 }}>
          <StandardIconText onClick={isLiked ? onUnlike : onLike}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: "#cb0634" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            <Typography sx={{ pl: 0.5 }}>{likeNumber}</Typography>
          </StandardIconText>
          <StandardIconText onClick={() => onOpen()}>
            <CommentOutlinedIcon />
            <Typography sx={{ pl: 0.5 }}>{commentNumber}</Typography>
          </StandardIconText>
        </Box>
      </Box>
    </Box>
  )
}

const StandardIconText = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "grey",
  marginRight: "25px",
  cursor: "default"
})

export default MomentCard
