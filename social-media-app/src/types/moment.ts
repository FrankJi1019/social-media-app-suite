import { Comment } from "./comment"
import { Character } from "./character"
import { Tag } from "./tag"

export interface MomentBrief {
  id: string
  profile: string
  username: string
  character: Character
  postDate: Date
  content: string
  likeNumber: number
  commentNumber: number
  isLiked: boolean
  isOwnMoment: boolean
}

export interface Moment {
  id: string
  profile: string
  username: string
  character: Character
  postDate: Date
  content: string
  likeNumber: number
  comments: Array<Comment>
  isLiked: boolean
  tags: Array<Tag>
}
