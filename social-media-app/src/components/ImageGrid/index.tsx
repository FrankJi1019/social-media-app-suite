import { FC, useMemo, useState } from "react"
import { Box, Grid, IconButton } from "@mui/material"
import Image from "material-ui-image"
import CloseIcon from "@mui/icons-material/Close"

export interface ImageGridProps {
  images: Array<string>
  limit?: number
  onDelete?: (index: number) => void
  onClick?: (index: number) => void
}

const ImageGrid: FC<ImageGridProps> = ({
  images,
  limit,
  onDelete,
  onClick
}) => {
  const slicedImageList = useMemo(
    () => (limit ? images.slice(0, limit + 1) : images),
    [images, limit]
  )

  const [showDeleteIcon, setShowDeleteIcon] = useState(-1)

  return (
    <Grid container>
      {slicedImageList.map((link, index) => (
        <Grid
          key={`${Math.random()}`}
          item
          xs={4}
          onMouseEnter={() =>
            setShowDeleteIcon(onDelete !== undefined ? index : -1)
          }
          onMouseLeave={() => setShowDeleteIcon(-1)}
          sx={{
            pl: index === 0 ? 0 : { xs: 0.3, md: 1 },
            pr: index === slicedImageList.length ? 0 : { xs: 0.3, md: 1 },
            paddingY: { xs: 0.3, md: 1 },
            position: "relative"
          }}
        >
          {onDelete && showDeleteIcon === index && (
            <IconButton
              onClick={() => onDelete(index)}
              sx={{
                backgroundColor: "error.main",
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 100,
                p: 0.2,
                "&:hover": {
                  backgroundColor: "error.main"
                }
              }}
            >
              <CloseIcon fontSize={"small"} sx={{ color: "white" }} />
            </IconButton>
          )}
          <Box sx={{ position: "relative" }}>
            <Box
              onClick={() => onClick && onClick(index)}
              sx={{
                zIndex: 50,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "bg.oppositePure",
                opacity: 0,
                "&:hover": {
                  opacity: onClick !== undefined ? 0.2 : 0
                }
              }}
            />
            <Image cover src={link} alt={""} animationDuration={0} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default ImageGrid
