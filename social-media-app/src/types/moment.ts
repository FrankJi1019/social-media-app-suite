import { Comment } from "./comment"
import { Character } from "./character"
import { Tag } from "./tag"
import { Account } from "./account"

export interface MomentBrief {
  id: string
  profile: string
  character: Character
  postDate: Date
  content: string
  likeNumber: number
  commentNumber: number
  isLiked: boolean
  isOwnMoment: boolean
  account: Account
}

export interface Moment {
  id: string
  profile: string
  account: Account
  character: Character
  postDate: Date
  content: string
  likeNumber: number
  comments: Array<Comment>
  isLiked: boolean
  tags: Array<Tag>
}
