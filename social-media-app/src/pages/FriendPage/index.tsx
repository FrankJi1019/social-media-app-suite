import { FC, useCallback, useEffect, useState } from "react"
import { PageProps } from "../../types/props"
import Page from "../../containers/Page"
import FriendPage from "./FriendPage"
import { useFetchChatHistory } from "../../api-hooks/chat"
import { useAuth } from "../../providers/CognitoAuthProvider"
import { Chat } from "../../types/chat"
import {
  useMessagingSocket,
  useSingleSubscribe
} from "../../providers/MessagingSocketProvider"

interface FriendPageProps extends PageProps {}

const FriendPageBuilder: FC<FriendPageProps> = (commonArgs) => {
  const { getCurrentUser } = useAuth()
  const { emit } = useMessagingSocket()

  const [chatHistory, setChatHistory] = useState<Array<Chat>>([])

  const friendUsername = "AnotherFrank"

  const { data: chatHistoryFetch } = useFetchChatHistory({
    accountNames: [getCurrentUser()?.Username as string, friendUsername]
  })

  const sendMessageHandler = useCallback(
    (message: string) => {
      const user = getCurrentUser()
      if (!user) return
      emit("message-sent", {
        content: message,
        senderUsername: user.Username,
        receiverUsername: friendUsername
      })
    },
    [emit, getCurrentUser]
  )

  useSingleSubscribe(
    "message-received",
    (chat) => {
      setChatHistory((prev) => [...prev, chat])
    },
    [setChatHistory]
  )

  useEffect(() => {
    setChatHistory(chatHistoryFetch)
  }, [chatHistoryFetch, setChatHistory])

  return (
    <Page {...commonArgs}>
      {chatHistory.length}
      <FriendPage
        currentUsername={getCurrentUser()?.Username as string}
        friendUsername={friendUsername}
        friendCharacter={"Snoopy"}
        chatHistory={chatHistory}
        onSend={sendMessageHandler}
      />
    </Page>
  )
}

export default FriendPageBuilder
