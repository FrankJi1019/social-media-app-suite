import { FC } from "react"
import { Typography, TypographyProps } from "@mui/material"

export interface InTextTagProps {
  name: string
  typographyProps?: TypographyProps
}

const InTextTag: FC<InTextTagProps> = ({ name, typographyProps = {} }) => {
  return (
    <Typography
      component={"span"}
      sx={{ color: "primary.main" }}
      {...typographyProps}
    >
      #{name + " "}
    </Typography>
  )
}

export default InTextTag
