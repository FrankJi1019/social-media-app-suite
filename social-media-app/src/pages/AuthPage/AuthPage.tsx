import React, { FC, useMemo } from "react"
import { Box } from "@mui/material"
// @ts-ignore
import logo from "../../assets/logo.svg"
import LoginForm from "../../components/LoginForm"
import RegisterForm from "../../components/RegisterForm"
import ConfirmUserForm from "../../components/ConfirmUserForm"
// @ts-ignore
import bgImage from "../../assets/background.jpg"

export interface AuthPageProps {
  username: string
  email: string
  formType: "login" | "register" | "confirm"
  onLogin: (username: string, password: string) => void
  onRegister: (username: string, email: string, password: string) => void
  onConfirmUser: (code: string) => void
  onNavigateLoginForm: () => void
  onNavigateSignupForm: () => void
}

const AuthPage: FC<AuthPageProps> = ({
  username,
  email,
  formType,
  onLogin,
  onRegister,
  onConfirmUser,
  onNavigateLoginForm,
  onNavigateSignupForm
}) => {
  const form = useMemo(() => {
    if (formType === "login") {
      return (
        <LoginForm onLogin={onLogin} onNavigateSignup={onNavigateSignupForm} />
      )
    } else if (formType === "register") {
      return (
        <RegisterForm
          onRegister={onRegister}
          onNavigateLogin={onNavigateLoginForm}
        />
      )
    } else {
      return (
        <ConfirmUserForm
          username={username}
          email={email}
          onConfirm={onConfirmUser}
        />
      )
    }
  }, [
    email,
    formType,
    onConfirmUser,
    onLogin,
    onNavigateLoginForm,
    onNavigateSignupForm,
    onRegister,
    username
  ])

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        background: `url(${bgImage})`,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          width: "30%",
          backdropFilter: "blur(10px)",
          paddingY: 3,
          paddingX: 4,
          backgroundColor: "rgba(255, 255, 255, .25)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img src={logo} alt={""} />
        <Box sx={{ mt: 2, width: "100%" }}>{form}</Box>
      </Box>
    </Box>
  )
}

export default AuthPage
