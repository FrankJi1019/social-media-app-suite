import { Meta, StoryObj } from "@storybook/react"
import AuthPage, { AuthPageProps } from "./AuthPage"
import { Decorate, FUNCTION_PLACE_HOLDER } from "../../stories/utils"

export default {
  title: "pages/AuthPage",
  component: AuthPage,
  parameters: {
    layout: "fullscreen"
  }
} as Meta<typeof AuthPage>

const render = (args: any) => Decorate(<AuthPage {...args} />)

export const LoginView = {
  render,
  args: {
    username: "Alice",
    email: "alice@example.com",
    formType: "login",
    onLogin: FUNCTION_PLACE_HOLDER,
    onNavigateLoginForm: FUNCTION_PLACE_HOLDER,
    onRegister: FUNCTION_PLACE_HOLDER,
    onConfirmUser: FUNCTION_PLACE_HOLDER,
    onNavigateSignupForm: FUNCTION_PLACE_HOLDER
  } as AuthPageProps
} as StoryObj

export const RegisterView = {
  render,
  args: {
    username: "Alice",
    email: "alice@example.com",
    formType: "register",
    onLogin: FUNCTION_PLACE_HOLDER,
    onNavigateLoginForm: FUNCTION_PLACE_HOLDER,
    onRegister: FUNCTION_PLACE_HOLDER,
    onConfirmUser: FUNCTION_PLACE_HOLDER,
    onNavigateSignupForm: FUNCTION_PLACE_HOLDER
  } as AuthPageProps
} as StoryObj

export const ConfirmUserView = {
  render,
  args: {
    username: "Alice",
    email: "alice@example.com",
    formType: "confirm",
    onLogin: FUNCTION_PLACE_HOLDER,
    onNavigateLoginForm: FUNCTION_PLACE_HOLDER,
    onRegister: FUNCTION_PLACE_HOLDER,
    onConfirmUser: FUNCTION_PLACE_HOLDER,
    onNavigateSignupForm: FUNCTION_PLACE_HOLDER
  } as AuthPageProps
} as StoryObj
