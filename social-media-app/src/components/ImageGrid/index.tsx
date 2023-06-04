import { FC } from "react"
import { Grid } from "@mui/material"
import Image from "material-ui-image"

interface ImageGridProps {
  images: Array<string>
}

const ImageGrid: FC<ImageGridProps> = ({ images }) => {
  return (
    <Grid container>
      {images.map((link) => (
        <Grid key={link} item xs={3} sx={{ p: 1 }}>
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
