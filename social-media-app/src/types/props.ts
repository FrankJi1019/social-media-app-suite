import { ReactNode } from "react"

export interface ProviderProps {
  children: ReactNode
}

export interface ModalProps {
  onClose: () => void
}
