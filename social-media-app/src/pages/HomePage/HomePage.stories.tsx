import { Meta, StoryObj } from "@storybook/react"
import HomePage, { HomePageProps } from "./HomePage"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"
import { MomentBrief } from "../../types/moment"

export default {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof HomePage>

const render = (args: any) => Decorate(<HomePage {...args} />)

const moment = {
  id: "1",
  username: "Alice",
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
  isOwnMoment: false,
  isLiked: false
} as MomentBrief

const filterOptions = [
  {
    text: "Home",
    filter: "all",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Followed",
    filter: "followed",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Study",
    filter: "study",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Work",
    filter: "work",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Life",
    filter: "life",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Emotion",
    filter: "emotion",
    onClick: FUNCTION_PLACE_HOLDER
  },
  {
    text: "Hobby",
    filter: "hobby",
    onClick: FUNCTION_PLACE_HOLDER
  }
] as Array<{
  text: string
  filter: string
  onClick: () => void
}>

export const General = {
  render,
  args: {
    moments: Array(5).fill(moment),
    currentFilter: "life",
    filterOptions,
    onMomentLike: FUNCTION_PLACE_HOLDER,
    onMomentUnlike: FUNCTION_PLACE_HOLDER,
    onMomentOpen: FUNCTION_PLACE_HOLDER,
    onMomentReport: FUNCTION_PLACE_HOLDER,
    onMomentChat: FUNCTION_PLACE_HOLDER
  } as HomePageProps
} as StoryObj
