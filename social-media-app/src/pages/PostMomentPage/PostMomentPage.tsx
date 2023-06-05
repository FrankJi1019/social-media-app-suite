import React, { FC, useCallback, useRef, useState } from "react"
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography
} from "@mui/material"
import StandardContainer from "../../containers/StandardContainer"
import StandardFormContainer from "../../containers/StandardFormContainer"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import RefreshIcon from "@mui/icons-material/Refresh"
import CollectionsIcon from "@mui/icons-material/Collections"
import TagIcon from "@mui/icons-material/Tag"
import { LoadingButton } from "@mui/lab"
import TagDropdown from "../../components/TagDropdown"
import TagLabel from "../../components/TagLabel"
import ImageGrid from "../../components/ImageGrid"

export interface PostMomentPageProps {
  maxTagNumber: number
  maxImgNumber: number
  isSubmitting?: boolean
  character: string
  tags: Array<string>
  minMomentLength?: number
  maxMomentLength?: number
  onRequestNewCharacter: () => void
  onPost: (moment: string, tags: Array<string>, images: Array<FormData>) => void
  onBack: () => void
  onExceedMaxTag: () => void
}

const PostMomentPage: FC<PostMomentPageProps> = ({
  maxImgNumber,
  maxTagNumber,
  isSubmitting,
  character,
  tags,
  minMomentLength = 0,
  maxMomentLength,
  onRequestNewCharacter,
  onPost,
  onBack,
  onExceedMaxTag
}) => {
  const [content, setContent] = useState("")
  const [momentTags, setMomentTags] = useState<Array<string>>([])
  const [imageUrls, setImageUrls] = useState<Array<string>>([])
  const [imageData, setImageData] = useState<Array<FormData>>([])
  const [addingTag, setAddingTag] = useState(false)

  const fileInputRef = useRef(null)

  const selectFileHandler = useCallback((e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result) {
        setImageUrls((prev) => [...prev, reader.result!.toString()])
        const formData = new FormData()
        formData.append("file", file)
        setImageData((prev) => [...prev, formData])
      }
    }
  }, [])

  const removeFileHandler = useCallback(
    (index: number) => {
      setImageData((prev) => prev.filter((_, i) => i !== index))
      setImageUrls((prev) => prev.filter((_, i) => i !== index))
    },
    [setImageData, setImageUrls]
  )

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StandardContainer sx={{ flex: 1 }}>
        <StandardFormContainer onSubmit={() => {}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Box>
              <Button
                variant={"text"}
                startIcon={<ArrowBackIosNewIcon />}
                onClick={onBack}
              >
                BACK
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Typography color={"grey.800"} sx={{ mr: 1 }}>
                Your Character:{" "}
                <span style={{ fontWeight: "bold" }}>{character}</span>
              </Typography>
              <IconButton onClick={onRequestNewCharacter}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ borderBottom: "1px solid", borderColor: "primary.light" }}>
            <TextField
              multiline
              value={content}
              placeholder={"How was today?"}
              onChange={(e) => {
                if (
                  (maxMomentLength &&
                    e.target.value.length <= maxMomentLength) ||
                  !maxMomentLength
                ) {
                  setContent(e.target.value)
                }
              }}
              sx={{ border: "none" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {momentTags.map((tag) => (
              <Box key={tag} sx={{ paddingX: 1, paddingY: 0.8 }}>
                <TagLabel
                  tag={tag}
                  onRemove={(tag) =>
                    setMomentTags((prev) => prev.filter((t) => t !== tag))
                  }
                />
              </Box>
            ))}
          </Box>
          <Box>
            <ImageGrid images={imageUrls} onDelete={removeFileHandler} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box sx={{ display: "flex", flex: 1 }}>
              {maxImgNumber > imageData.length && (
                <>
                  <IconButton
                    onClick={() =>
                      fileInputRef.current &&
                      (fileInputRef.current as any).click()
                    }
                  >
                    <CollectionsIcon sx={{ color: "primary.dark" }} />
                  </IconButton>
                  <input
                    type={"file"}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={selectFileHandler}
                  />
                </>
              )}
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                {addingTag ? (
                  <TagDropdown
                    tagList={tags}
                    onFinishAdding={() => setAddingTag(false)}
                    onAddingNewTag={(newTag) => {
                      if (momentTags.length >= maxTagNumber) {
                        onExceedMaxTag()
                      } else if (!momentTags.includes(newTag)) {
                        setMomentTags((prev) => [...prev, newTag])
                      }
                    }}
                  />
                ) : (
                  <IconButton
                    onClick={() => {
                      if (momentTags.length < maxTagNumber) {
                        setAddingTag(true)
                      } else {
                        onExceedMaxTag()
                      }
                    }}
                  >
                    <TagIcon sx={{ color: "primary.dark" }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  borderRight: "1px solid",
                  borderColor:
                    content.length === 0 ? "transparent" : "primary.dark",
                  alignItems: "center",
                  pr: 2
                }}
              >
                {maxMomentLength && (
                  <CircularProgress
                    color={
                      content.length < minMomentLength ? "error" : "success"
                    }
                    size={25}
                    variant={"determinate"}
                    value={(content.length / maxMomentLength) * 100}
                  />
                )}
              </Box>
              <Box sx={{ pl: 2 }}>
                <LoadingButton
                  variant={"contained"}
                  loading={isSubmitting}
                  disabled={content.length < minMomentLength}
                  onClick={() => onPost(content, momentTags, imageData)}
                >
                  POST
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </StandardFormContainer>
      </StandardContainer>
    </Box>
  )
}

export default PostMomentPage
