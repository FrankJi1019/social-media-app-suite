import { Meta, StoryObj } from "@storybook/react"
import Page, { PageProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
import { Box, Typography } from "@mui/material"
import { Friendship } from "../../types/friend"

export default {
  title: "Containers/Page",
  component: Page,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof Page>

const children = (
  <Box>
    <Typography>Main Content</Typography>
  </Box>
)

const user = { Username: "Alice" } as any

const friends = [
  {
    id: "1",
    friendAccount: { username: "Bob" },
    friendCharacter: { name: "Patrick Star" },
    userAccount: { username: "Alice" },
    userCharacter: { name: "Optimus Prime" }
  }
] as Array<Friendship>

const render = (args: any) => Decorate(<Page {...args} />)

export const General = {
  render,
  args: {
    user,
    friends,
    children,
    onLogin: FUNCTION_PLACE_HOLDER,
    onRegister: FUNCTION_PLACE_HOLDER,
    onSignOut: FUNCTION_PLACE_HOLDER,
    onPostNew: FUNCTION_PLACE_HOLDER,
    onFriendAvatarClick: FUNCTION_PLACE_HOLDER,
    onRunUnauthenticatedAction: FUNCTION_PLACE_HOLDER,
    onReportMoment: FUNCTION_PLACE_HOLDER
  } as PageProps
} as StoryObj
