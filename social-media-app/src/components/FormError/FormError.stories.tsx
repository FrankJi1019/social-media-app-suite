import FormError, { FormErrorProps } from "./index"
import { Meta, StoryObj } from "@storybook/react"
import { Decorate } from "../../stories/utils"

export default {
  title: "Components/FormError",
  component: FormError,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof FormError>

const render = (args: any) => Decorate(<FormError {...args} />)

export const General = {
  render,
  args: {
    message: "Invalid login credential"
  } as FormErrorProps
} as StoryObj
