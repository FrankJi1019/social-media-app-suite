import { ReactNode } from "react"
import { User } from "../providers/CognitoAuthProvider"

// props that all the page level (index.tsx) components have
export interface PageProps {
  user?: User
  friends?: Array<{ id: string; profile: string; name: string }>
  onLogin?: () => void
  onRegister?: () => void
  notifyLoginOrRegister?: () => void
  onPostNew: () => void
}

export interface ProviderProps {
  children: ReactNode
}
