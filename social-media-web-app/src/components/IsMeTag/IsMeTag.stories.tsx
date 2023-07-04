import { Meta, StoryObj } from "@storybook/react"
import { Decorate } from "../../stories/utils"
import IsMeTag from "./index"

export default {
  title: "Components/IsMeTag",
  component: IsMeTag,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof IsMeTag>

const render = () => Decorate(<IsMeTag />)

export const General = {
  render
} as StoryObj
