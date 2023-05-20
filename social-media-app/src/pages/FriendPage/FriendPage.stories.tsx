import { Meta, StoryObj } from "@storybook/react"
import FriendPage, { FriendPageProps } from "./FriendPage"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
import { Chat } from "../../types/chat"

export default {
  title: "Pages/FriendPage",
  component: FriendPage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof FriendPage>

const render = (args: any) => Decorate(<FriendPage {...args} />)

const chatHistory = [
  {
    id: "1",
    content: "nulla aliquet enim tortor at auctor",
    sentTime: new Date(),
    sender: { username: "Alice" },
    receiver: { username: "Bob" }
  },
  {
    id: "2",
    content: "nulla aliquet enim tortor at auctor",
    sentTime: new Date(),
    sender: { username: "Bob" },
    receiver: { username: "Alice" }
  },
  {
    id: "3",
    content: "nulla aliquet enim tortor at auctor",
    sentTime: new Date(),
    sender: { username: "Alice" },
    receiver: { username: "Bob" }
  },
  {
    id: "4",
    content: "nulla aliquet enim tortor at auctor",
    sentTime: new Date(),
    sender: { username: "Alice" },
    receiver: { username: "Bob" }
  },
  {
    id: "5",
    content: "nulla aliquet enim tortor at auctor",
    sentTime: new Date(),
    sender: { username: "Bob" },
    receiver: { username: "Alice" }
  }
] as Array<Chat>

export const General = {
  render,
  args: {
    currentUsername: "Bob",
    friendUsername: "Alice",
    friendCharacter: "Snoopy",
    chatHistory,
    onSend: FUNCTION_PLACE_HOLDER
  } as FriendPageProps
} as StoryObj
