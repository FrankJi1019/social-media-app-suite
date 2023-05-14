import { ReactNode } from "react"
import { User } from "../providers/CognitoAuthProvider"

export interface PageProps {
  user?: User
  friends?: Array<{ id: string; profile: string; name: string }>
  onLogin?: () => void
  onRegister?: () => void
  notifyLoginOrRegister?: () => void
}

export interface ProviderProps {
  children: ReactNode
}
