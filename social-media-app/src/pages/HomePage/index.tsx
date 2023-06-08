import React, { FC, useCallback, useEffect, useMemo } from "react"
import HomePage from "./HomePage"
import Page, { PageProps } from "../../containers/Page"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  useFetchAllMoments,
  useLazyFetchMomentById,
  useLikeMomentMutation,
  useUnlikeMomentMutation
} from "../../api-hooks/moments"
import { Routes } from "../../routes/routes"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { useFetchAllCategories } from "../../api-hooks/category"
import { useModal } from "../../providers/ModalProvider"
import ReportModal from "../../modals/ReportModal"

interface HomepageProps extends PageProps {}

const HomePageBuilder: FC<HomepageProps> = (commonArgs) => {
  const { currentUser, signOut } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { closeModal, openModal } = useModal()

  const filterOption = useMemo(() => {
    const filter = searchParams.get("filter")
    if (!filter || filter === "all") {
      return undefined
    } else if (filter === "followed") {
      return { followedBy: currentUser?.Username }
    } else {
      return { category: filter }
    }
  }, [currentUser, searchParams])

  const { data: allMoments, reFetch: reFetchAllMoments } =
    useFetchAllMoments(filterOption)
  const { data: categoriesResponse } = useFetchAllCategories()
  const { fetch: fetchMoment } = useLazyFetchMomentById()

  const { mutate: likeMoment } = useLikeMomentMutation()
  const { mutate: unlikeMoment } = useUnlikeMomentMutation()

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
      const user = currentUser
      if (user) {
        await likeMoment({ momentId, username: user.Username as string })
        await reFetchAllMoments()
      } else {
        commonArgs.onRunUnauthenticatedAction &&
          commonArgs.onRunUnauthenticatedAction()
      }
    },
    [commonArgs, currentUser, likeMoment, reFetchAllMoments]
  )

  const unlikeMomentHandler = useCallback(
    async (momentId: string) => {
      const user = currentUser
      if (user) {
        await unlikeMoment({ momentId, username: user.Username as string })
        await reFetchAllMoments()
      } else {
        commonArgs.onRunUnauthenticatedAction &&
          commonArgs.onRunUnauthenticatedAction()
      }
    },
    [currentUser, unlikeMoment, reFetchAllMoments, commonArgs]
  )

  const openMomentHandler = useCallback(
    (id: string) => {
      navigate(Routes.MOMENT_DETAIL_PAGE.generate({ id }).toString())
    },
    [navigate]
  )

  const momentChatHandler = useCallback(
    async (username: string) => {
      await commonArgs.onFriendAvatarClick(username)
    },
    [commonArgs]
  )

  const reportMomentHandler = useCallback(
    async (id: string) => {
      const data = await fetchMoment(id)
      openModal(
        <ReportModal
          imageList={data.images}
          content={data.content}
          onClose={closeModal}
          onSubmit={async (reason) => {
            await commonArgs.onReportMoment(id, reason)
            closeModal()
          }}
        />
      )
    },
    [closeModal, commonArgs, fetchMoment, openModal]
  )

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
