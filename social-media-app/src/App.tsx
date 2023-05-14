import React, { useCallback, useMemo } from "react"
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  createSearchParams
} from "react-router-dom"
import AuthPageBuilder from "./pages/AuthPage"
import HomePageBuilder from "./pages/HomePage"
import { useAuth } from "./providers/CognitoAuthProvider"
import { Routes as AppRoutes } from "../src/routes/routes"
import { PageProps } from "./types/props"
import PostMomentPageBuilder from "./pages/PostMomentPage"
// @ts-ignore
import profile from "./assets/placeholders/profile-placeholder.jpg"
import MomentDetailPageBuilder from "./pages/MomentDetailPage"
import { useNotification } from "./providers/NotificationProvider"

const PublicRouter = () => {
  const { getCurrentUser } = useAuth()
  const navigate = useNavigate()
  const notify = useNotification()

  const navigateLoginHandler = useCallback(() => {
    navigate({
      pathname: AppRoutes.AUTH_PATH.path,
      search: createSearchParams({ form: "login" }).toString()
    })
  }, [navigate])

  const navigateRegisterHandler = useCallback(() => {
    navigate({
      pathname: AppRoutes.AUTH_PATH.path,
      search: createSearchParams({ form: "register" }).toString()
    })
  }, [navigate])

  const notifyLoginOrRegister = useCallback(() => {
    notify("Please register or login first", {
      buttonOptions: [
        {
          text: "Register",
          props: {
            variant: "contained",
            onClick: () => navigateRegisterHandler()
          }
        },
        {
          text: "Login",
          props: {
            variant: "outlined",
            onClick: () => navigateLoginHandler()
          }
        }
      ]
    })
  }, [navigateLoginHandler, navigateRegisterHandler, notify])

  const tempFriends = Array(3)
    .fill({})
    .map(() => ({
      id: `${Math.random()}`,
      profile,
      name: "Frank Ji"
    }))

  const commonArgs = useMemo(
    () =>
      ({
        user: getCurrentUser(),
        onLogin: navigateLoginHandler,
        onRegister: navigateRegisterHandler,
        friends: tempFriends,
        notifyLoginOrRegister
      } as PageProps),
    [
      getCurrentUser,
      navigateLoginHandler,
      navigateRegisterHandler,
      tempFriends,
      notifyLoginOrRegister
    ]
  )

  return (
    <Routes>
      <Route path={"/auth"} element={<AuthPageBuilder />} />
      <Route path={"/"} element={<HomePageBuilder {...commonArgs} />} />
      <Route
        path={"/post"}
        element={<PostMomentPageBuilder {...commonArgs} />}
      />
      <Route
        path={"/moments/:id"}
        element={<MomentDetailPageBuilder {...commonArgs} />}
      />
      <Route path={"*"} element={<Navigate to={"/auth"} />} />
    </Routes>
  )
}

export default PublicRouter
