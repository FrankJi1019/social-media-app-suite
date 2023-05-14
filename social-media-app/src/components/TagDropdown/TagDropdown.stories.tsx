import { Meta, StoryObj } from "@storybook/react"
import TagDropdown, { TagDropdownProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Components/TagDropdown",
  component: TagDropdown,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof TagDropdown>

const render = (args: any) => Decorate(<TagDropdown {...args} />)

const tagList = ["music", "travel", "programming", "friends"]

export const General = {
  render,
  args: {
    tagList,
    onAddingNewTag: FUNCTION_PLACE_HOLDER,
    onFinishAdding: FUNCTION_PLACE_HOLDER
  } as TagDropdownProps
} as StoryObj
