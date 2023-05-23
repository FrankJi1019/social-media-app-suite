import { Character } from "./character"
import { Account } from "./account"

export interface Comment {
  id: string
  character: Character
  profile: string
  content: string
  commentDate: Date
  isOwnComment: boolean
  account: Account
}
