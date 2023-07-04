import { Meta, StoryObj } from "@storybook/react"
import TimeLabel, { TimeLabelProps } from "./index"
import { Decorate } from "../../stories/utils"

export default {
  title: "Components/TimeLabel",
  component: TimeLabel,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof TimeLabel>

const render = (args: any) => Decorate(<TimeLabel {...args} />)

export const GENERAL = {
  render,
  args: {
    time: "00:00 01/01/1970"
  } as TimeLabelProps
} as StoryObj
