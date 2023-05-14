import { Meta, StoryObj } from "@storybook/react"
import PostMomentPage, { PostMomentPageProps } from "./PostMomentPage"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Pages/PostMomentPage",
  component: PostMomentPage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof PostMomentPage>

const render = (args: any) => Decorate(<PostMomentPage {...args} />)

const tags = ["music", "travel", "programming", "friends"]

export const WithoutMaxLength = {
  render,
  args: {
    maxMomentLength: Number.MAX_VALUE,
    minMomentLength: 0,
    tags,
    maxTagNumber: 3,
    isSubmitting: false,
    character: "Bugs Bunny",
    onExceedMaxTag: FUNCTION_PLACE_HOLDER,
    onPost: FUNCTION_PLACE_HOLDER,
    onBack: FUNCTION_PLACE_HOLDER,
    onRequestNewCharacter: FUNCTION_PLACE_HOLDER
  } as PostMomentPageProps
} as StoryObj

export const WithMaxLength = {
  render,
  args: {
    maxMomentLength: 20,
    minMomentLength: 0,
    tags,
    maxTagNumber: 3,
    isSubmitting: false,
    character: "Bugs Bunny",
    onExceedMaxTag: FUNCTION_PLACE_HOLDER,
    onPost: FUNCTION_PLACE_HOLDER,
    onBack: FUNCTION_PLACE_HOLDER,
    onRequestNewCharacter: FUNCTION_PLACE_HOLDER
  } as PostMomentPageProps
} as StoryObj
