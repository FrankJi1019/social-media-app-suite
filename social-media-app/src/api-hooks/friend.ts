import { useMutation } from "@apollo/client"
import { ADD_FRIEND_MUTATION } from "./graphql"
import { useCallback } from "react"

export const useAddFriendMutation = () => {
  const [mutate, { loading }] = useMutation(ADD_FRIEND_MUTATION)
  const addFriend = useCallback(
    async (input: {
      account1Username: string
      account2Username: string
      account1Character: string
      account2Character: string
    }) => {
      // const { data } = await mutate({ variables: { input } })
      // return data.createFriendship
    },
    [mutate]
  )
  return { mutate: addFriend, loading }
}
