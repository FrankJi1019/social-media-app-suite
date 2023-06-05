import React, { FC, useCallback, useState } from "react"
import { ModalProps } from "../../types/props"
import { Box, IconButton } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CloseIcon from "@mui/icons-material/Close"

interface ImageModalProps extends ModalProps {
  imageList: Array<string>
  index: number
}

const ImageModal: FC<ImageModalProps> = ({ imageList, index, onClose }) => {
  const [currentImage, setCurrentImage] = useState(index)

  const lastImageHandler = useCallback(() => {
    setCurrentImage((prevState) => Math.max(0, prevState - 1))
  }, [setCurrentImage])

  const nextImageHandler = useCallback(() => {
    setCurrentImage((prevState) =>
      Math.min(imageList.length - 1, prevState + 1)
    )
  }, [imageList.length, setCurrentImage])

  return (
    <Box
      sx={{
        height: {
          xs: "90%",
          md: "75%"
        },
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={onClose}
          sx={{
            borderRadius: 1,
            border: "1px solid",
            borderColor: "grey.A700",
            p: 0.3
          }}
        >
          <CloseIcon fontSize={"small"} />
        </IconButton>
      </Box>
      <Box
        sx={{
          pt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          height: "1px"
        }}
      >
        <IconButton onClick={lastImageHandler}>
          <ChevronLeftIcon fontSize={"large"} />
        </IconButton>
        <img
          src={imageList[currentImage]}
          alt={""}
          height={"100%"}
          // width={"100%"}
          style={{ objectFit: "contain" }}
        />
        <IconButton onClick={nextImageHandler}>
          <ChevronRightIcon fontSize={"large"} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ImageModal
