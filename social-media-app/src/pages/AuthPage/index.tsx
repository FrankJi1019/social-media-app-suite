import React, { useCallback, useEffect, useState } from "react"
import AuthPage from "./AuthPage"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Routes } from "../../routes/routes"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { useCreateAccount } from "../../api-hooks/account"

const AuthPageBuilder = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signIn, register, confirmUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const { mutate: createAccount } = useCreateAccount()

  const loginHandler = useCallback(
    async (username: string, password: string) => {
      try {
        await signIn(username, password)
        navigate({
          pathname: Routes.HOME_PAGE.path
        })
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [navigate, signIn]
  )

  const registerHandler = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        await register(username, email, password)
        setUsername(username)
        setEmail(email)
        setPassword(password)
        setSearchParams({ form: "confirm" })
        await createAccount({ username })
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [createAccount, register, setSearchParams]
  )

  const confirmUserHandler = useCallback(
    async (code: string) => {
      try {
        await confirmUser(username, code)
        await signIn(username, password)
        navigate({
          pathname: Routes.HOME_PAGE.path
        })
      } catch (e: any) {
        throw new Error(e.message)
      }
    },
    [confirmUser, navigate, password, signIn, username]
  )

  const navigateSignUpHandler = useCallback(() => {
    setSearchParams({ form: "register" })
  }, [setSearchParams])

  const navigateLoginHandler = useCallback(() => {
    setSearchParams({ form: "login" })
  }, [setSearchParams])

  useEffect(() => {
    const queryValue = searchParams.get("form")
    if (
      !(queryValue && ["login", "register", "confirm"].includes(queryValue))
    ) {
      setSearchParams({ form: "login" })
    }
  }, [searchParams, setSearchParams])

  return (
    <AuthPage
      username={username}
      email={email}
      formType={searchParams.get("form") as "login" | "register" | "confirm"}
      onLogin={loginHandler}
      onRegister={registerHandler}
      onConfirmUser={confirmUserHandler}
      onNavigateLoginForm={navigateLoginHandler}
      onNavigateSignupForm={navigateSignUpHandler}
    />
  )
}

export default AuthPageBuilder
