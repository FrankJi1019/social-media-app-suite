import { Meta, StoryObj } from "@storybook/react"
import LoginForm, { LoginFormProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof LoginForm>

const render = (args: any) => Decorate(<LoginForm {...args} />)

export const General = {
  render,
  args: {
    onLogin: FUNCTION_PLACE_HOLDER,
    onNavigateSignup: FUNCTION_PLACE_HOLDER
  } as LoginFormProps
} as StoryObj
