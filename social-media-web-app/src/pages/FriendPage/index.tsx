import { FC, useCallback, useEffect, useState } from "react"
import Page, { PageProps } from "../../containers/Page"
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
import { utcTimestampToDate } from "../../utils/time"

interface FriendPageProps extends PageProps {}

const FriendPageBuilder: FC<FriendPageProps> = (commonArgs) => {
  const { friendshipId } = useParams()
  const { currentUser } = useAuth()
  const { emit, socket } = useMessagingSocket()

  const [chatHistory, setChatHistory] = useState<Array<Chat>>([])

  const { data: friendship } = useFetchFriendshipById(friendshipId as string)

  const {
    data: chatHistoryFetch,
    fetch: fetchChatHistory,
    called: hasFetchedChatHistory,
    loading: isFetchingChatHistory
  } = useLazyFetchChatHistory()

  const scrollMessageContainerToBottom = useCallback(() => {}, [])

  const sendMessageHandler = useCallback(
    (message: string) => {
      const user = currentUser
      if (!user) return
      emit("message-sent", {
        content: message,
        senderUsername: user.Username,
        receiverUsername: friendship?.friendAccount.username
      })
      scrollMessageContainerToBottom()
    },
    [
      currentUser,
      emit,
      friendship?.friendAccount.username,
      scrollMessageContainerToBottom
    ]
  )

  const goBackHandler = useCallback(() => window.history.back(), [])

  useSingleSubscribe(
    "message-received",
    (chat) => {
      setChatHistory((prev) => [
        ...prev,
        { ...chat, sentTime: utcTimestampToDate(+new Date(chat.createdAt)) }
      ])
    },
    [setChatHistory, socket?.connected]
  )

  useEffect(() => {
    const container = document.querySelector(".message-container")
    if (!container) return
    container.scroll({
      top: container.scrollHeight - container.clientHeight,
      left: 0
    })
  }, [chatHistory.length])

  useEffect(() => {
    ;(async () => {
      const user = currentUser
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
    currentUser,
    hasFetchedChatHistory,
    isFetchingChatHistory
  ])

  return (
    <Page {...commonArgs}>
      {friendship ? (
        <FriendPage
          currentUsername={currentUser?.Username as string}
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
