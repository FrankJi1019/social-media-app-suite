import React, { FC, useState } from "react"
import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
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

export interface MomentDetailPageProps {
  moment: Moment
  onBack: () => void
  onLike: () => void
  onUnlike: () => void
  onComment: (comment: string) => void
}

const MomentDetailPage: FC<MomentDetailPageProps> = ({
  moment,
  onBack,
  onUnlike,
  onLike,
  onComment
}) => {
  const [comment, setComment] = useState("")

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StandardContainer sx={{ flex: 1, paddingX: 4, paddingY: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant={"text"}
            startIcon={<ArrowBackIosNewIcon />}
            onClick={onBack}
          >
            BACK
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={moment.profile} sx={{ mr: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Typography variant={"h4"}>{moment.character.name}</Typography>
            <Typography variant={"body1"} sx={{ color: "grey", ml: 1 }}>
              @ {momentFormatter(moment.postDate).format("hh:mm DD MMM")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginY: 2,
            paddingY: 2,
            borderBottom: "1px solid",
            borderColor: "grey.A400"
          }}
        >
          <Typography>
            {moment.content}{" "}
            {moment.tags.map(({ id, name }) => (
              <InTextTag key={id} name={name} />
            ))}
          </Typography>
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
              <Comment {...comment} character={comment.character.name} />
            </Box>
          ))}
        </Box>
      </StandardContainer>
    </Box>
  )
}

export default MomentDetailPage
