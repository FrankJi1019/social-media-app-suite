import InTextTag, { InTextTagProps } from "./index"
import { Meta, StoryObj } from "@storybook/react"
import { Decorate } from "../../stories/utils"

export default {
  title: "Components/InTextTag",
  component: InTextTag,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof InTextTag>

const render = (args: any) => Decorate(<InTextTag {...args} />)

export const General = {
  render,
  args: {
    name: "hobby"
  } as InTextTagProps
} as StoryObj
