import { FC, useMemo, useState } from "react"
import { Grid, IconButton } from "@mui/material"
import Image from "material-ui-image"
import CloseIcon from "@mui/icons-material/Close"

export interface ImageGridProps {
  images: Array<string>
  limit?: number
  onDelete?: (index: number) => void
}

const ImageGrid: FC<ImageGridProps> = ({ images, limit, onDelete }) => {
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
          <Image
            cover
            src={link}
            alt={""}
            width={"100%"}
            animationDuration={0}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ImageGrid
