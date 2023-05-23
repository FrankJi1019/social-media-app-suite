import { ReactNode } from "react"
import { User } from "../providers/CognitoAuthProvider"
import { Friendship } from "./friend"

// props that all the page level (index.tsx) components have
export interface PageProps {
  user?: User
  friends?: Array<Friendship>
  onLogin?: () => void
  onRegister?: () => void
  notifyLoginOrRegister?: () => void
  onPostNew: () => void
}

export interface ProviderProps {
  children: ReactNode
}
