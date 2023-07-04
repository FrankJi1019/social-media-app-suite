import { Meta, StoryObj } from "@storybook/react"
import Comment, { CommentProps } from "./index"
import { Decorate } from "../../stories/utils"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/Comment",
  component: Comment,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof Comment>

const render = (args: any) => Decorate(<Comment {...args} />)

export const OwnComment = {
  render,
  args: {
    profile,
    commentDate: new Date(),
    content: "mauris cursus mattis molestie a iaculis at erat",
    isOwnComment: true,
    character: "Bugs Bunny"
  } as CommentProps
} as StoryObj

export const OthersComment = {
  render,
  args: {
    profile,
    commentDate: new Date(),
    content: "mauris cursus mattis molestie a iaculis at erat",
    isOwnComment: false,
    character: "Bugs Bunny",
    isAuthor: false
  } as CommentProps
} as StoryObj

export const LongComment = {
  render,
  args: {
    profile,
    commentDate: new Date(),
    content:
      // eslint-disable-next-line max-len
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit. Ac turpis egestas sed tempus.",
    isOwnComment: false,
    character: "Bugs Bunny",
    isAuthor: false
  } as CommentProps
} as StoryObj
