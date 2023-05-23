import { Meta, StoryObj } from "@storybook/react"
import MomentDetailPage, { MomentDetailPageProps } from "./MomentDetailPage"
import { Moment } from "../../types/moment"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"

export default {
  title: "Pages/MomentDetailPage",
  component: MomentDetailPage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof MomentDetailPage>

const render = (args: any) => Decorate(<MomentDetailPage {...args} />)

const moment = {
  id: "1",
  account: {
    id: "1",
    username: "Alice",
    createdAt: new Date()
  },
  content:
    // eslint-disable-next-line max-len
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Suscipit adipiscing bibendum est ultricies integer. Blandit libero volutpat sed cras ornare arcu. Rhoncus dolor purus non enim praesent elementum facilisis leo. Molestie at elementum eu facilisis sed odio. Sed risus pretium quam vulputate dignissim suspendisse in.",
  character: {
    id: "1",
    name: "Bugs Bunny"
  },
  isLiked: true,
  profile,
  postDate: new Date(),
  likeNumber: 20,
  tags: [
    { id: "1", name: "music" },
    { id: "2", name: "travel" }
  ],
  comments: [
    {
      id: "1",
      account: {
        id: "1",
        username: "Alice"
      },
      content: "nunc mi ipsum faucibus vitae",
      profile,
      character: {
        id: "1",
        name: "Bugs Bunny"
      },
      commentDate: new Date(),
      isOwnComment: false
    }
  ]
} as Moment

export const General = {
  render,
  args: {
    moment,
    onBack: FUNCTION_PLACE_HOLDER,
    onUnlike: FUNCTION_PLACE_HOLDER,
    onLike: FUNCTION_PLACE_HOLDER,
    onComment: FUNCTION_PLACE_HOLDER,
    onChat: FUNCTION_PLACE_HOLDER,
    onReport: FUNCTION_PLACE_HOLDER
  } as MomentDetailPageProps
} as StoryObj
