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
import {
  useCreateCommentMutation,
  useFetchCommentsByMoment
} from "../../api-hooks/comment"
import { useModal } from "../../providers/ModalProvider"
import ReportModal from "../../modals/ReportModal"
import ImageModal from "../../modals/ImageModal"
import { useFetchAccount } from "../../api-hooks/account"

interface MomentDetailPageProps extends PageProps {}

const MomentDetailPageBuilder: FC<MomentDetailPageProps> = (commonArgs) => {
  const { id } = useParams()
  const { currentUser, signOut } = useAuth()
  const { openModal, closeModal } = useModal()

  const { data: user } = useFetchAccount(currentUser?.Username || "")

  const {
    data: moment,
    loading,
    reFetch: reFetchMoment
  } = useFetchMomentById(id as string)
  const { data: characterList } = useFetchAllCharacters()
  const { data: comments } = useFetchCommentsByMoment(id as string)

  const { mutate: likeMoment } = useLikeMomentMutation()
  const { mutate: unlikeMoment } = useUnlikeMomentMutation()
  const { mutate: createComment } = useCreateCommentMutation()

  const goBackHandler = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    history.back()
  }, [])

  const likeMomentHandler = useCallback(async () => {
    const user = currentUser
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
  }, [commonArgs, currentUser, id, likeMoment, reFetchMoment])

  const unlikeMomentHandler = useCallback(async () => {
    const user = currentUser
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
  }, [currentUser, unlikeMoment, id, reFetchMoment, commonArgs])

  const signOutHandler = useCallback(() => {
    signOut()
    reFetchMoment().then(() => {})
  }, [reFetchMoment, signOut])

  const commentHandler = useCallback(
    async (comment: string) => {
      if (characterList.length === 0 || !moment) return
      const data = {
        username: currentUser!.Username as string,
        character:
          characterList[Math.floor(Math.random() * characterList.length)],
        content: comment,
        momentId: moment.id
      }
      await createComment(data)
      await reFetchMoment()
    },
    [characterList, createComment, currentUser, moment, reFetchMoment]
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
        imageList={moment.images}
        content={moment.content}
        onClose={closeModal}
        onSubmit={async (reason) => {
          await commonArgs.onReportMoment(moment.id, reason)
          closeModal()
        }}
      />
    )
  }, [closeModal, commonArgs, moment, openModal])

  const viewImageHandler = useCallback(
    (imageList: Array<string>, index: number) => {
      openModal(
        <ImageModal imageList={imageList} index={index} onClose={closeModal} />
      )
    },
    [closeModal, openModal]
  )

  const isLoading = useMemo(() => !moment || loading, [moment, loading])

  if (isLoading) return <Box>Loading</Box>

  return (
    <Page {...commonArgs} onSignOut={signOutHandler}>
      <MomentDetailPage
        showSubmenu={user?.username !== moment?.account.username}
        userProfile={user?.profileImage || ""}
        moment={moment!}
        comments={comments}
        onBack={goBackHandler}
        onLike={likeMomentHandler}
        onUnlike={unlikeMomentHandler}
        onComment={commentHandler}
        onChat={chatHandler}
        onReport={reportMomentHandler}
        onViewImage={viewImageHandler}
      />
    </Page>
  )
}

export default MomentDetailPageBuilder
