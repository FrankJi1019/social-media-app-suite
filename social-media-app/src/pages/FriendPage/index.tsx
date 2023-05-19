import { FC } from "react"
import { PageProps } from "../../types/props"
import Page from "../../containers/Page"
import FriendPage from "./FriendPage"

interface FriendPageProps extends PageProps {}

const FriendPageBuilder: FC<FriendPageProps> = (commonArgs) => {
  return (
    <Page {...commonArgs}>
      <FriendPage
        friendUsername={"Another Frank"}
        friendCharacter={"Snoopy"}
        chatHistory={[]}
        onSend={(message) => console.log(message)}
      />
    </Page>
  )
}

export default FriendPageBuilder
