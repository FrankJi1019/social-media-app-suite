import React, { FC, useCallback, useEffect, useState } from "react"
import Page, { PageProps } from "../../containers/Page"
import PostMomentPage from "./PostMomentPage"
import { useFetchAllCharacters } from "../../api-hooks/characters"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { usePostMomentMutation } from "../../api-hooks/moments"
import { useNavigate } from "react-router-dom"
import { Routes } from "../../routes/routes"
import { useFetchAllTags } from "../../api-hooks/tag"
import { useNotification } from "../../providers/NotificationProvider"
import { pickRandomElement } from "../../utils/random"

const MAX_TAG_NUM = 3
const MAX_IMG_NUM = 9

interface PostMomentPageProps extends PageProps {}

const PostMomentPageBuilder: FC<PostMomentPageProps> = (commonArgs) => {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()
  const notify = useNotification()

  const [character, setCharacter] = useState("")

  const { data: characterList } = useFetchAllCharacters()
  const { data: tagList } = useFetchAllTags()

  const { mutate, loading } = usePostMomentMutation()

  const postHandler = useCallback(
    async (content: string, tags: Array<string>, images: Array<FormData>) => {
      const user = await currentUser
      if (user) {
        const params = {
          content,
          character,
          username: user.Username as string,
          tags,
          images
        }
        await mutate(params)
        navigate({ pathname: Routes.HOME_PAGE.path })
      } else {
        alert("You are not logged in")
      }
    },
    [character, currentUser, mutate, navigate]
  )

  const requestRandomNameHandler = useCallback(() => {
    if (characterList.length === 0) return
    setCharacter(pickRandomElement(characterList))
  }, [characterList])

  const goBackHandler = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    history.back()
  }, [])

  const signOutHandler = useCallback(() => {
    signOut()
    navigate({ pathname: Routes.HOME_PAGE.path })
  }, [signOut, navigate])

  const exceedMaxTagHandler = useCallback(() => {
    notify(`You can add max ${MAX_TAG_NUM} tags`)
  }, [notify])

  useEffect(() => {
    requestRandomNameHandler()
  }, [requestRandomNameHandler])

  return (
    <Page {...commonArgs} onSignOut={signOutHandler} hideMobileNavBar>
      <PostMomentPage
        maxImgNumber={MAX_IMG_NUM}
        maxTagNumber={MAX_TAG_NUM}
        isSubmitting={loading}
        character={character}
        // minMomentLength={10}
        tags={tagList.map(({ name }) => name)}
        // maxMomentLength={400}
        onRequestNewCharacter={requestRandomNameHandler}
        onPost={postHandler}
        onBack={goBackHandler}
        onExceedMaxTag={exceedMaxTagHandler}
      />
    </Page>
  )
}

export default PostMomentPageBuilder
