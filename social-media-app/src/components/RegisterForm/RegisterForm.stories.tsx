import { Meta, StoryObj } from "@storybook/react"
import RegisterForm, { RegisterFormProps } from "./index"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "Components/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered"
  }
} as Meta<typeof RegisterForm>

const render = (args: any) => Decorate(<RegisterForm {...args} />)

export const General = {
  render,
  args: {
    onRegister: FUNCTION_PLACE_HOLDER,
    onNavigateLogin: FUNCTION_PLACE_HOLDER
  } as RegisterFormProps
} as StoryObj
