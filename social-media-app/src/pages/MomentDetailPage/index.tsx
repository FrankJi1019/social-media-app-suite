import React, { FC, useCallback, useMemo } from "react"
import { PageProps } from "../../types/props"
import Page from "../../containers/Page"
import MomentDetailPage from "./MomentDetailPage"
import { useNavigate, useParams } from "react-router-dom"
import {
  useFetchMomentById,
  useLikeMomentMutation,
  useUnlikeMomentMutation
} from "../../api-hooks/moments"
import { Box } from "@mui/material"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { useFetchAllCharacters } from "../../api-hooks/characters"
import { useCreateCommentMutation } from "../../api-hooks/comment"
import { useAddFriendMutation } from "../../api-hooks/friend"
import { useNotification } from "../../providers/NotificationProvider"
import { Routes } from "../../routes/routes"
import { pickRandomElement } from "../../utils/random"

interface MomentDetailPageProps extends PageProps {}

const MomentDetailPageBuilder: FC<MomentDetailPageProps> = (commonArgs) => {
  const { id } = useParams()
  const { getCurrentUser, signOut } = useAuth()
  const navigate = useNavigate()
  const notify = useNotification()

  const {
    data: moment,
    loading,
    reFetch: reFetchMoment
  } = useFetchMomentById(id as string)
  const { data: characterList } = useFetchAllCharacters()

  const { mutate: likeMoment } = useLikeMomentMutation()
  const { mutate: unlikeMoment } = useUnlikeMomentMutation()
  const { mutate: createComment } = useCreateCommentMutation()
  const { mutate: addFriend } = useAddFriendMutation()

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
      commonArgs.notifyLoginOrRegister && commonArgs.notifyLoginOrRegister()
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
      commonArgs.notifyLoginOrRegister && commonArgs.notifyLoginOrRegister()
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

  const ChatHandler = useCallback(
    async (friendUsername: string, friendCharacter: string) => {
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
      const character = pickRandomElement(characterList)
      await addFriend({
        account1Username: username,
        account1Character: character,
        account2Username: friendUsername,
        account2Character: friendCharacter
      })
    },
    [addFriend, characterList, getCurrentUser, navigate, notify]
  )

  const reportMomentHandler = useCallback(
    () => notify("Feature to be implemented"),
    [notify]
  )

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
        onChat={ChatHandler}
        onReport={reportMomentHandler}
      />
    </Page>
  )
}

export default MomentDetailPageBuilder
