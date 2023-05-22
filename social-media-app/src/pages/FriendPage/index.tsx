import { FC, useCallback, useEffect, useState } from "react"
import { PageProps } from "../../types/props"
import Page from "../../containers/Page"
import FriendPage from "./FriendPage"
import { useLazyFetchChatHistory } from "../../api-hooks/chat"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { Chat } from "../../types/chat"
import {
  useMessagingSocket,
  useSingleSubscribe
} from "../../providers/MessagingSocketProvider"
import { useParams } from "react-router-dom"
import { useFetchFriendshipById } from "../../api-hooks/friend"

interface FriendPageProps extends PageProps {}

const FriendPageBuilder: FC<FriendPageProps> = (commonArgs) => {
  const { friendshipId } = useParams()
  const { getCurrentUser } = useAuth()
  const { emit } = useMessagingSocket()

  const [chatHistory, setChatHistory] = useState<Array<Chat>>([])

  const { data: friendship } = useFetchFriendshipById(friendshipId as string)

  const {
    data: chatHistoryFetch,
    fetch: fetchChatHistory,
    called: hasFetchedChatHistory,
    loading: isFetchingChatHistory
  } = useLazyFetchChatHistory()

  const sendMessageHandler = useCallback(
    (message: string) => {
      const user = getCurrentUser()
      if (!user) return
      emit("message-sent", {
        content: message,
        senderUsername: user.Username,
        receiverUsername: friendship?.friendAccount.username
      })
    },
    [emit, friendship?.friendAccount.username, getCurrentUser]
  )

  const goBackHandler = useCallback(() => window.history.back(), [])

  useSingleSubscribe(
    "message-received",
    (chat) => {
      console.log("chat", chat)
      setChatHistory((prev) => [...prev, chat])
    },
    [setChatHistory]
  )

  useEffect(() => {
    ;(async () => {
      const user = getCurrentUser()
      if (user && friendship && !isFetchingChatHistory) {
        if (!hasFetchedChatHistory) {
          await fetchChatHistory({
            accountNames: [user.Username!, friendship.friendAccount.username]
          })
        }
        setChatHistory(chatHistoryFetch)
      }
    })()
  }, [
    chatHistoryFetch,
    fetchChatHistory,
    friendship,
    getCurrentUser,
    hasFetchedChatHistory,
    isFetchingChatHistory
  ])

  return (
    <Page {...commonArgs}>
      {friendship ? (
        <FriendPage
          currentUsername={getCurrentUser()?.Username as string}
          friendUsername={friendship.friendAccount.username}
          friendCharacter={friendship.friendCharacter.name}
          chatHistory={chatHistory}
          onSend={sendMessageHandler}
          onBack={goBackHandler}
        />
      ) : null}
    </Page>
  )
}

export default FriendPageBuilder
