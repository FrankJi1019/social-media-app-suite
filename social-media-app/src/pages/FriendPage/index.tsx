import { FC } from "react"
import { PageProps } from "../../types/props"
import Page from "../../containers/Page"
import FriendPage from "./FriendPage"
import { useFetchChatHistory } from "../../api-hooks/chat"
import { useAuth } from "../../providers/CognitoAuthProvider"

interface FriendPageProps extends PageProps {}

const FriendPageBuilder: FC<FriendPageProps> = (commonArgs) => {
  const { getCurrentUser } = useAuth()

  const friendUsername = "AnotherFrank"

  const { data: chatHistory } = useFetchChatHistory({
    accountNames: [getCurrentUser()?.Username as string, friendUsername]
  })

  return (
    <Page {...commonArgs}>
      <FriendPage
        currentUsername={getCurrentUser()?.Username as string}
        friendUsername={friendUsername}
        friendCharacter={"Snoopy"}
        chatHistory={chatHistory}
        onSend={(message) => console.log(message)}
      />
    </Page>
  )
}

export default FriendPageBuilder
