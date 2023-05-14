import { Meta, StoryObj } from "@storybook/react"
import UserAvatar, { UserAvatarProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof UserAvatar>

const render = (args: any) => Decorate(<UserAvatar {...args} />)

export const FriendAvatar = {
  render,
  args: {
    profile,
    name: "Alice",
    onClick: FUNCTION_PLACE_HOLDER
  } as UserAvatarProps
} as StoryObj

export const OwnAvatar = {
  render,
  args: {
    profile,
    name: "Alice",
    avatarStyle: "rounded",
    reverseAlign: true,
    onClick: FUNCTION_PLACE_HOLDER
  } as UserAvatarProps
} as StoryObj
