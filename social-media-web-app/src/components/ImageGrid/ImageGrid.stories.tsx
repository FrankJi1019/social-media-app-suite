import { Meta, StoryObj } from "@storybook/react"
import ImageGrid, { ImageGridProps } from "./index"
import { Decorate } from "../../stories/utils"
// @ts-ignore
import image from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/ImageGrid",
  component: ImageGrid,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof ImageGrid>

const render = (args: any) => Decorate(<ImageGrid {...args} />)

export const NoLimit = {
  render,
  args: {
    images: Array(5).fill(image)
  } as ImageGridProps
} as StoryObj

export const WithLimit = {
  render,
  args: {
    images: Array(5).fill(image),
    limit: 3
  } as ImageGridProps
} as StoryObj
