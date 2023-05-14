import { Meta, StoryObj } from "@storybook/react"
import StandardContainer, { StandardContainerProps } from "./index"
import { Decorate } from "../../stories/utils"
import { Box, Typography } from "@mui/material"

export default {
  title: "Containers/StandardContainer",
  component: StandardContainer,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof StandardContainer>

const children = (
  <Box>
    <Typography>Main Content</Typography>
  </Box>
)

const render = (args: any) => Decorate(<StandardContainer {...args} />)

export const General = {
  render,
  args: {
    children
  } as StandardContainerProps
} as StoryObj
