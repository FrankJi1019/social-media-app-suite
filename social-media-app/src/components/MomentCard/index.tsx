import React, { FC } from "react"
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  styled,
  Typography
} from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import FavoriteIcon from "@mui/icons-material/Favorite"
import moment from "moment"
import { MomentBrief } from "../../types/moment"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ImageGrid from "../ImageGrid"
import IsMeTag from "../IsMeTag"

export interface MomentCardProps {
  moment: MomentBrief
  onOpen: () => void
  onLike: () => void
  onUnlike: () => void
  onChat: () => void
  onReport: () => void
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
    isOwnMoment,
    images,
    account
  },
  onLike,
  onOpen,
  onUnlike,
  onChat,
  onReport
}) => {
  const [anchorPos, setAnchorPos] = React.useState<null | HTMLElement>(null)

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        p: 1
      }}
    >
      {!isOwnMoment && (
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <Box onClick={(e) => setAnchorPos(e.currentTarget)}>
            <MoreHorizIcon sx={{ color: "grey.A400" }} />
          </Box>
          <Menu
            open={Boolean(anchorPos)}
            onClose={() => {
              setAnchorPos(null)
            }}
            anchorEl={anchorPos}
          >
            <MenuItem
              onClick={() => {
                onChat()
                setAnchorPos(null)
              }}
            >
              <Typography>Chat</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                onReport()
                setAnchorPos(null)
              }}
            >
              <Typography>Report</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      <Box sx={{ mr: 1 }}>
        <Avatar src={account.profileImage} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography variant={"h6"} sx={{ fontWeight: "bold", mr: 1 }}>
            {character.name} {isOwnMoment && <IsMeTag />}
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
        <Box>
          <Grid container>
            <Grid item xs={12} md={5}>
              <ImageGrid images={images} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", mt: 1, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
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
