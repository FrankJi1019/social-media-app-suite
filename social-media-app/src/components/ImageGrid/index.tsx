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

  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  return (
    <Grid container>
      {slicedImageList.map((link, index) => (
        <Grid
          key={`${Math.random()}`}
          item
          xs={3}
          onMouseEnter={() => setShowDeleteIcon(onDelete !== undefined && true)}
          onMouseLeave={() => setShowDeleteIcon(false)}
          sx={{ p: 1, position: "relative" }}
        >
          {onDelete && showDeleteIcon && (
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
