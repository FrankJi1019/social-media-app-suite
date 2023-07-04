import ConfirmUserForm, { ConfirmUserFormProps } from "./index"
import { Meta, StoryObj } from "@storybook/react"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Components/ConfirmUserForm",
  component: ConfirmUserForm,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof ConfirmUserForm>

const render = (args: any) => Decorate(<ConfirmUserForm {...args} />)

export const General = {
  render,
  args: {
    username: "Alice",
    email: "alice@example.com",
    onConfirm: FUNCTION_PLACE_HOLDER
  } as ConfirmUserFormProps
} as StoryObj
