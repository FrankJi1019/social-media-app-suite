import React, { FC, useCallback, useEffect, useMemo } from "react"
import HomePage from "./HomePage"
import { PageProps } from "../../types/props"
// @ts-ignore
import Page from "../../containers/Page"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  useFetchAllMoments,
  useLikeMomentMutation,
  useUnlikeMomentMutation
} from "../../api-hooks/moments"
import { Routes } from "../../routes/routes"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { useFetchAllCategories } from "../../api-hooks/category"
import { useNotification } from "../../providers/NotificationProvider"
import { useFindOrCreateFriendshipMutation } from "../../api-hooks/friend"
import { useFetchAllCharacters } from "../../api-hooks/characters"

interface HomepageProps extends PageProps {}

const HomePageBuilder: FC<HomepageProps> = (commonArgs) => {
  const { getCurrentUser, signOut } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const notify = useNotification()

  const filterOption = useMemo(() => {
    const filter = searchParams.get("filter")
    if (!filter || filter === "all") {
      return undefined
    } else if (filter === "followed") {
      return { followedBy: getCurrentUser()?.Username }
    } else {
      return { category: filter }
    }
  }, [getCurrentUser, searchParams])

  const { data: allMoments, reFetch: reFetchAllMoments } =
    useFetchAllMoments(filterOption)
  const { data: categoriesResponse } = useFetchAllCategories()
  const { data: characterList } = useFetchAllCharacters()

  const { mutate: likeMoment } = useLikeMomentMutation()
  const { mutate: unlikeMoment } = useUnlikeMomentMutation()
  const { mutate: findOrCreateFriendship } = useFindOrCreateFriendshipMutation()

  const allCategories = useMemo(() => {
    const categories = [
      {
        text: "Home",
        filter: "all",
        onClick: () => setSearchParams({ filter: "all" })
      },
      {
        text: "Followed",
        filter: "followed",
        onClick: () => setSearchParams({ filter: "followed" })
      }
    ]
    categories.push(
      ...categoriesResponse.map(({ name }) => ({
        text:
          name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase(),
        filter: name,
        onClick: () => setSearchParams({ filter: name })
      }))
    )
    return categories as Array<{
      text: string
      filter: string
      onClick: () => void
    }>
  }, [categoriesResponse, setSearchParams])

  const likeMomentHandler = useCallback(
    async (momentId: string) => {
      const user = getCurrentUser()
      if (user) {
        await likeMoment({ momentId, username: user.Username as string })
        await reFetchAllMoments()
      } else {
        commonArgs.notifyLoginOrRegister && commonArgs.notifyLoginOrRegister()
      }
    },
    [commonArgs, getCurrentUser, likeMoment, reFetchAllMoments]
  )

  const unlikeMomentHandler = useCallback(
    async (momentId: string) => {
      const user = getCurrentUser()
      if (user) {
        await unlikeMoment({ momentId, username: user.Username as string })
        await reFetchAllMoments()
      } else {
        commonArgs.notifyLoginOrRegister && commonArgs.notifyLoginOrRegister()
      }
    },
    [getCurrentUser, unlikeMoment, reFetchAllMoments, commonArgs]
  )

  const openMomentHandler = useCallback(
    (id: string) => {
      navigate(Routes.MOMENT_DETAIL_PAGE.generate({ id }).toString())
    },
    [navigate]
  )

  const momentChatHandler = useCallback(
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
                onClick: () => navigate({ pathname: Routes.AUTH_PATH.path })
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
      navigate({
        pathname: Routes.FRIEND_PAGE.generate({
          friendshipId: friendship.id
        }).toString()
      })
    },
    [
      characterList.length,
      findOrCreateFriendship,
      getCurrentUser,
      navigate,
      notify
    ]
  )

  const reportMomentHandler = useCallback(() => {
    notify("Feature to be implemented")
  }, [notify])

  const signOutHandler = useCallback(() => {
    signOut()
    reFetchAllMoments().then(() => {})
  }, [signOut, reFetchAllMoments])

  useEffect(() => {
    const filter = searchParams.get("filter")
    const validFilters = allCategories.map(({ filter }) => filter)
    if (
      !(filter && validFilters.includes(filter)) &&
      validFilters.length !== 0
    ) {
      setSearchParams({ filter: validFilters[0] })
    }
  }, [allCategories, searchParams, setSearchParams])

  return (
    <Page {...commonArgs} onSignOut={signOutHandler}>
      <HomePage
        currentFilter={searchParams.get("filter")!}
        filterOptions={allCategories}
        moments={allMoments || []}
        onMomentLike={likeMomentHandler}
        onMomentUnlike={unlikeMomentHandler}
        onMomentOpen={openMomentHandler}
        onMomentChat={momentChatHandler}
        onMomentReport={reportMomentHandler}
      />
    </Page>
  )
}

export default HomePageBuilder
