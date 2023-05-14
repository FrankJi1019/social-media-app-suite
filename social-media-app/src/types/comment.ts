import { Character } from "./character"

export interface Comment {
  id: string
  username: string
  character: Character
  profile: string
  content: string
  commentDate: Date
  isOwnComment: boolean
}
