import { Meta, StoryObj } from "@storybook/react"
import TagLabel, { TagLabelProps } from "."
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Components/TagLabel",
  component: TagLabel,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof TagLabel>

const render = (args: any) => Decorate(<TagLabel {...args} />)

export const General = {
  render,
  args: {
    tag: "music",
    onRemove: FUNCTION_PLACE_HOLDER
  } as TagLabelProps
} as StoryObj
