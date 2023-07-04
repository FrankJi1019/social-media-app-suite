import { Meta, StoryObj } from "@storybook/react"
import AuthBlock, { AuthBlockProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/AuthBlock",
  component: AuthBlock,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof AuthBlock>

const render = (args: any) => Decorate(<AuthBlock {...args} />)

export const Authenticated = {
  render,
  args: {
    avatarOptions: {
      name: "Alice",
      profile,
      avatarStyle: "rounded",
      reverseAlign: false
    },
    onPostNew: FUNCTION_PLACE_HOLDER,
    onSignOut: FUNCTION_PLACE_HOLDER,
    onLogin: undefined,
    onRegister: undefined
  } as AuthBlockProps
} as StoryObj

export const AuthenticatedReversed = {
  render,
  args: {
    avatarOptions: {
      name: "Alice",
      profile,
      avatarStyle: "rounded",
      reverseAlign: true
    },
    onPostNew: FUNCTION_PLACE_HOLDER,
    onSignOut: FUNCTION_PLACE_HOLDER,
    onRegister: undefined,
    onLogin: undefined
  } as AuthBlockProps
} as StoryObj

export const Unauthenticated = {
  render,
  args: {
    onRegister: FUNCTION_PLACE_HOLDER,
    onLogin: FUNCTION_PLACE_HOLDER,
    onSignOut: undefined,
    onPostNew: undefined
  } as AuthBlockProps
} as StoryObj
