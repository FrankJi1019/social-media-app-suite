import { Account } from "./account"
import { Character } from "./character"

export interface Friendship {
  id: string
  hasUnread: boolean
  userAccount: Account
  userCharacter: Character
  friendAccount: Account
  friendCharacter: Character
}
