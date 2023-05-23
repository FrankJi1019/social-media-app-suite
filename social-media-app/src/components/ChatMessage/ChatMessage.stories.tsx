import { Meta, StoryObj } from "@storybook/react"
import ChatMessage, { ChatMessageProps } from "./index"
import { Decorate } from "../../stories/utils"

// @ts-ignore
import profileImage from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/ChatMessage",
  component: ChatMessage,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof ChatMessage>

const render = (args: any) => Decorate(<ChatMessage {...args} />)

export const FriendMessage = {
  render,
  args: {
    content: "nulla aliquet enim tortor at auctor",
    profileImage,
    isOwnMessage: false
  } as ChatMessageProps
} as StoryObj

export const OwnMessage = {
  render,
  args: {
    content: "nulla aliquet enim tortor at auctor",
    profileImage,
    isOwnMessage: true
  } as ChatMessageProps
} as StoryObj
