import { Meta, StoryObj } from "@storybook/react"
import MomentCard, { MomentCardProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
import { MomentBrief } from "../../types/moment"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Components/MomentCard",
  component: MomentCard,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof MomentCard>

const render = (args: any) => Decorate(<MomentCard {...args} />)

const moment = {
  id: "1",
  account: {
    id: "1",
    username: "Alice",
    createdAt: new Date()
  },
  content:
    // eslint-disable-next-line max-len
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit. Ac turpis egestas sed tempus.",
  character: {
    id: "1",
    name: "Bugs Bunny"
  },
  profile,
  postDate: new Date(),
  commentNumber: 10,
  likeNumber: 20,
  isOwnMoment: true,
  isLiked: true
} as MomentBrief

export const OwnLiked = {
  render,
  args: {
    moment: { ...moment },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj

export const OwnUnliked = {
  render,
  args: {
    moment: { ...moment, isLiked: false },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj

export const OthersLiked = {
  render,
  args: {
    moment: { ...moment, isOwnMoment: false },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj

export const OthersUnliked = {
  render,
  args: {
    moment: { ...moment, isOwnMoment: false, isLiked: false },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj

export const LongContent = {
  render,
  args: {
    moment: {
      ...moment,
      content:
        // eslint-disable-next-line max-len
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Suscipit adipiscing bibendum est ultricies integer. Blandit libero volutpat sed cras ornare arcu. Rhoncus dolor purus non enim praesent elementum facilisis leo. Molestie at elementum eu facilisis sed odio. Sed risus pretium quam vulputate dignissim suspendisse in."
    },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj

export const WithImage = {
  render,
  args: {
    moment: {
      ...moment,
      isOwnMoment: false,
      isLiked: false,
      images: Array(9).fill(profile)
    },
    onLike: FUNCTION_PLACE_HOLDER,
    onOpen: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER
  } as MomentCardProps
} as StoryObj
