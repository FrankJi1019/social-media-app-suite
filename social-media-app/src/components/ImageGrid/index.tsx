import { FC, useMemo } from "react"
import { Grid } from "@mui/material"
import Image from "material-ui-image"

export interface ImageGridProps {
  images: Array<string>
  limit?: number
}

const ImageGrid: FC<ImageGridProps> = ({ images, limit }) => {
  const slicedImageList = useMemo(
    () => (limit ? images.slice(0, limit + 1) : images),
    [images, limit]
  )

  return (
    <Grid container>
      {slicedImageList.map((link) => (
        <Grid key={`${Math.random()}`} item xs={3} sx={{ p: 1 }}>
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
