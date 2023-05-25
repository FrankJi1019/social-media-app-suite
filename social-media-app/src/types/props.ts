import { ReactNode } from "react"
import { SxProps } from "@mui/material"

export interface ProviderProps {
  children: ReactNode
}

export interface ModalProps {
  onClose: () => void
}

export interface ContainerProps {
  children: ReactNode
  sx?: SxProps
}
