import { Meta, StoryObj } from "@storybook/react"
import { Decorate } from "../../stories/utils"
import IsAuthorTag from "./index"

export default {
  title: "Components/IsAuthorTag",
  component: IsAuthorTag,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof IsAuthorTag>

const render = () => Decorate(<IsAuthorTag />)

export const General = {
  render
} as StoryObj
