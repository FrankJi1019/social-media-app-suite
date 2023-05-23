import { Account } from "./account"

export interface Chat {
  id: string
  sender: Account
  receiver: Account
  content: string
  sentTime: Date
}
