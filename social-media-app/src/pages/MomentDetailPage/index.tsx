import React, { FC, useCallback, useMemo } from "react"
import Page, { PageProps } from "../../containers/Page"
import MomentDetailPage from "./MomentDetailPage"
import { useParams } from "react-router-dom"
import {
  useFetchMomentById,
  useLikeMomentMutation,
  useUnlikeMomentMutation
} from "../../api-hooks/moments"
import { Box } from "@mui/material"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { useFetchAllCharacters } from "../../api-hooks/characters"
import { useCreateCommentMutation } from "../../api-hooks/comment"
import { useNotification } from "../../providers/NotificationProvider"
import { useModal } from "../../providers/ModalProvider"
import ReportModal from "../../modals/ReportModal"

interface MomentDetailPageProps extends PageProps {}

const MomentDetailPageBuilder: FC<MomentDetailPageProps> = (commonArgs) => {
  const { id } = useParams()
  const { getCurrentUser, signOut } = useAuth()
  const notify = useNotification()
  const { openModal, closeModal } = useModal()

  const {
    data: moment,
    loading,
    reFetch: reFetchMoment
  } = useFetchMomentById(id as string)
  const { data: characterList } = useFetchAllCharacters()

  const { mutate: likeMoment } = useLikeMomentMutation()
  const { mutate: unlikeMoment } = useUnlikeMomentMutation()
  const { mutate: createComment } = useCreateCommentMutation()

  const goBackHandler = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    history.back()
  }, [])

  const likeMomentHandler = useCallback(async () => {
    const user = getCurrentUser()
    if (user) {
      await likeMoment({
        momentId: id as string,
        username: user.Username as string
      })
      await reFetchMoment()
    } else {
      commonArgs.onRunUnauthenticatedAction &&
        commonArgs.onRunUnauthenticatedAction()
    }
  }, [commonArgs, getCurrentUser, id, likeMoment, reFetchMoment])

  const unlikeMomentHandler = useCallback(async () => {
    const user = getCurrentUser()
    if (user) {
      await unlikeMoment({
        momentId: id as string,
        username: user.Username as string
      })
      await reFetchMoment()
    } else {
      commonArgs.onRunUnauthenticatedAction &&
        commonArgs.onRunUnauthenticatedAction()
    }
  }, [getCurrentUser, unlikeMoment, id, reFetchMoment, commonArgs])

  const signOutHandler = useCallback(() => {
    signOut()
    reFetchMoment().then(() => {})
  }, [reFetchMoment, signOut])

  const commentHandler = useCallback(
    async (comment: string) => {
      if (characterList.length === 0 || !moment) return
      const data = {
        username: getCurrentUser()!.Username as string,
        character:
          characterList[Math.floor(Math.random() * characterList.length)],
        content: comment,
        momentId: moment.id
      }
      await createComment(data)
      await reFetchMoment()
    },
    [characterList, createComment, getCurrentUser, moment, reFetchMoment]
  )

  const chatHandler = useCallback(
    async (username: string) => {
      await commonArgs.onFriendAvatarClick(username)
    },
    [commonArgs]
  )

  const reportMomentHandler = useCallback(() => {
    if (!moment) return
    openModal(
      <ReportModal
        content={moment.content}
        onClose={closeModal}
        onSubmit={async (reason) => {
          await commonArgs.onReportMoment(moment.id, reason)
          closeModal()
        }}
      />
    )
  }, [closeModal, commonArgs, moment, openModal])

  const isLoading = useMemo(() => !moment || loading, [moment, loading])

  if (isLoading) return <Box>Loading</Box>

  return (
    <Page {...commonArgs} onSignOut={signOutHandler}>
      <MomentDetailPage
        moment={moment!}
        onBack={goBackHandler}
        onLike={likeMomentHandler}
        onUnlike={unlikeMomentHandler}
        onComment={commentHandler}
        onChat={chatHandler}
        onReport={reportMomentHandler}
      />
    </Page>
  )
}

export default MomentDetailPageBuilder
