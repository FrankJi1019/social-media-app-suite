import { Meta, StoryObj } from "@storybook/react"
import FriendPage, { FriendPageProps } from "./FriendPage"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Pages/FriendPage",
  component: FriendPage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof FriendPage>

const render = (args: any) => Decorate(<FriendPage {...args} />)

export const General = {
  render,
  args: {
    friendUsername: "Alice",
    friendCharacter: "Snoopy",
    chatHistory: [],
    onSend: FUNCTION_PLACE_HOLDER
  } as FriendPageProps
} as StoryObj
