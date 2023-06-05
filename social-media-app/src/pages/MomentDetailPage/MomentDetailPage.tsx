import React, { FC, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography
} from "@mui/material"
import StandardContainer from "../../containers/StandardContainer"
import { Moment } from "../../types/moment"
import momentFormatter from "moment"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
// @ts-ignore
import profilePlaceholder from "../../assets/placeholders/profile-placeholder.jpg"
import Comment from "../../components/Comment"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import FavoriteIcon from "@mui/icons-material/Favorite"
import InTextTag from "../../components/InTextTag"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ImageGrid from "../../components/ImageGrid"

export interface MomentDetailPageProps {
  moment: Moment
  onBack: () => void
  onLike: () => void
  onUnlike: () => void
  onComment: (comment: string) => void
  onChat: (momentAuthorUsername: string, momentAuthorCharacter: string) => void
  onReport: () => void
  onViewImage: (imageList: Array<string>, index: number) => void
}

const MomentDetailPage: FC<MomentDetailPageProps> = ({
  moment,
  onBack,
  onUnlike,
  onLike,
  onComment,
  onChat,
  onReport,
  onViewImage
}) => {
  const [comment, setComment] = useState("")
  const [anchorPos, setAnchorPos] = React.useState<null | HTMLElement>(null)

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StandardContainer sx={{ flex: 1 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              variant={"text"}
              startIcon={<ArrowBackIosNewIcon />}
              onClick={onBack}
            >
              BACK
            </Button>
          </Box>
          <Box>
            <IconButton onClick={(e) => setAnchorPos(e.currentTarget)}>
              <MoreHorizIcon sx={{ color: "grey.A400" }} />
            </IconButton>
            <Menu
              open={Boolean(anchorPos)}
              onClose={() => {
                setAnchorPos(null)
              }}
              anchorEl={anchorPos}
            >
              <MenuItem
                onClick={() => {
                  onChat(moment.account.username, moment.character.name)
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={moment.profile} sx={{ mr: 1 }} />
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Typography variant={"h4"} sx={{ mr: 1 }}>
              {moment.character.name}
            </Typography>
            <Typography variant={"body1"} sx={{ color: "grey" }}>
              @ {momentFormatter(moment.postDate).format("hh:mm DD MMM")}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginY: 2 }}>
          <Typography>
            {moment.content}{" "}
            {moment.tags.map(({ id, name }) => (
              <InTextTag key={id} name={name} />
            ))}
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "grey.A400",
            pb: 2
          }}
        >
          <Grid container>
            <Grid item xs={12} md={8}>
              <ImageGrid
                images={moment.images}
                onClick={(index) => {
                  onViewImage(moment.images, index)
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", mr: 2 }}>
              <Typography
                sx={{ fontWeight: "bold", color: "primary.dark", mr: 0.5 }}
              >
                {moment.likeNumber}
              </Typography>
              <Typography>Likes</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ fontWeight: "bold", color: "primary.dark", mr: 0.5 }}
              >
                {moment.comments.length}
              </Typography>
              <Typography>Comments</Typography>
            </Box>
          </Box>
          <Box>
            {moment.isLiked ? (
              <Button
                variant={"text"}
                endIcon={<FavoriteIcon />}
                onClick={onUnlike}
              >
                Unlike
              </Button>
            ) : (
              <Button
                variant={"text"}
                endIcon={<FavoriteBorderIcon />}
                onClick={onLike}
              >
                Like
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onComment(comment)
                setComment("")
              }}
            >
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={"Say something..."}
                sx={{ backgroundColor: "primary.extraLight" }}
              />
            </form>
          </Box>
          <Avatar src={profilePlaceholder} />
        </Box>
        <Box sx={{ mt: 7 }}>
          {moment.comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }}>
              <Comment
                {...comment}
                character={comment.character.name}
                isAuthor={comment.account.username === moment.account.username}
              />
            </Box>
          ))}
        </Box>
      </StandardContainer>
    </Box>
  )
}

export default MomentDetailPage
