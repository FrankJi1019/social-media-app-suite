import React, { useCallback, useMemo } from "react"
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  createSearchParams,
  useLocation
} from "react-router-dom"
import AuthPageBuilder from "./pages/AuthPage"
import HomePageBuilder from "./pages/HomePage"
import { useAuth } from "./providers/CognitoAuthProvider"
import { Routes as AppRoutes } from "../src/routes/routes"
import { PageProps } from "./containers/Page"
import PostMomentPageBuilder from "./pages/PostMomentPage"
import MomentDetailPageBuilder from "./pages/MomentDetailPage"
import { useNotification } from "./providers/NotificationProvider"
import FriendPage from "./pages/FriendPage"
import {
  useFetchFriends,
  useFindOrCreateFriendshipMutation
} from "./api-hooks/friend"
import { usePersistentSubscribe } from "./providers/MessagingSocketProvider"
import { useFetchAllCharacters } from "./api-hooks/characters"
import { useReportMomentMutation } from "./api-hooks/report"

const PublicRouter = () => {
  const { getCurrentUser } = useAuth()
  const navigate = useNavigate()
  const notify = useNotification()
  const { pathname } = useLocation()

  const { data: characterList } = useFetchAllCharacters()

  const { mutate: findOrCreateFriendship } = useFindOrCreateFriendshipMutation()
  const { mutate: reportMoment } = useReportMomentMutation()

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

  const postNewMomentHandler = useCallback(() => {
    if (pathname === AppRoutes.POST_MOMENT_PAGE.path) return
    navigate({
      pathname: AppRoutes.POST_MOMENT_PAGE.path
    })
  }, [navigate, pathname])

  const { data: friends, reFetch: reFetchFriends } = useFetchFriends(
    getCurrentUser()?.Username as string
  )

  const chatHandler = useCallback(
    async (friendUsername: string) => {
      if (characterList.length === 0) return
      const username = getCurrentUser()?.Username
      if (!username) {
        notify("Please login first", {
          buttonOptions: [
            {
              text: "Signup",
              props: {
                variant: "contained",
                onClick: () => navigate({ pathname: AppRoutes.AUTH_PATH.path })
              }
            }
          ]
        })
        return
      }
      const friendship = await findOrCreateFriendship({
        userAccountName: username,
        friendAccountName: friendUsername
      })
      const newPath = AppRoutes.FRIEND_PAGE.generate({
        friendshipId: friendship.id
      }).toString()
      if (newPath !== pathname) {
        navigate({ pathname: newPath })
      }
    },
    [
      characterList.length,
      findOrCreateFriendship,
      getCurrentUser,
      navigate,
      notify,
      pathname
    ]
  )

  const reportMomentHandler = useCallback(
    async (momentId: string, reason: string) => {
      const user = getCurrentUser()
      if (!user) {
        notifyLoginOrRegister()
      } else {
        await reportMoment({
          momentId,
          reporterUsername: user.Username as string,
          reason
        })
        notify("Thank you for reporting. We will review the post promptly.")
      }
    },
    [getCurrentUser, notify, notifyLoginOrRegister, reportMoment]
  )

  usePersistentSubscribe(
    "fetch-friends",
    () => {
      ;(async () => {
        await reFetchFriends()
      })()
    },
    [reFetchFriends]
  )

  const commonArgs = useMemo(
    () =>
      ({
        user: getCurrentUser(),
        onLogin: navigateLoginHandler,
        onRegister: navigateRegisterHandler,
        friends,
        onRunUnauthenticatedAction: notifyLoginOrRegister,
        onPostNew: postNewMomentHandler,
        onFriendAvatarClick: chatHandler,
        onReportMoment: reportMomentHandler
      } as PageProps),
    [
      getCurrentUser,
      navigateLoginHandler,
      navigateRegisterHandler,
      friends,
      notifyLoginOrRegister,
      postNewMomentHandler,
      chatHandler,
      reportMomentHandler
    ]
  )

  return (
    <Routes>
      <Route path={AppRoutes.AUTH_PATH.path} element={<AuthPageBuilder />} />
      <Route
        path={AppRoutes.HOME_PAGE.path}
        element={<HomePageBuilder {...commonArgs} />}
      />
      <Route
        path={AppRoutes.POST_MOMENT_PAGE.path}
        element={<PostMomentPageBuilder {...commonArgs} />}
      />
      <Route
        path={AppRoutes.MOMENT_DETAIL_PAGE.path}
        element={<MomentDetailPageBuilder {...commonArgs} />}
      />
      <Route
        path={AppRoutes.FRIEND_PAGE.path}
        element={<FriendPage {...commonArgs} />}
      />
      <Route path={"*"} element={<Navigate to={"/auth"} />} />
    </Routes>
  )
}

export default PublicRouter
