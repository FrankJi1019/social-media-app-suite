import { FC } from "react"
import { Box, ContainerProps, Modal } from "@mui/material"

interface ModalContainerProps extends ContainerProps {
  open: boolean
}

const ModalContainer: FC<ModalContainerProps> = ({ children, open }) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          "&>div": {
            position: "absolute",
            top: "50%",
            left: "50%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: {
              xs: "90%",
              md: "50%"
            },
            transform: "translate(-50%, -50%)",
            backgroundColor: "primary.extraLight",
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: "15px",
            "& div.MuiBox-root": {
              marginY: 0
            },
            overflow: "hidden"
          }
        }}
      >
        {children}
      </Box>
    </Modal>
  )
}

export default ModalContainer
