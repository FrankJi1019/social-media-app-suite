import { useMutation } from "@apollo/client"
import { ADD_FRIEND_MUTATION, FIND_OR_CREATE_FRIEND_QUERY } from "./graphql"
import { useCallback } from "react"
import { Friendship } from "../types/friend"

export const useAddFriendMutation = () => {
  const [mutate, { loading }] = useMutation(ADD_FRIEND_MUTATION)
  const addFriend = useCallback(
    async (input: {
      account1Username: string
      account2Username: string
      account1Character: string
      account2Character: string
    }) => {
      const { data } = await mutate({ variables: { input } })
      return data.createFriendship
    },
    [mutate]
  )
  return { mutate: addFriend, loading }
}

export const useFindOrCreateFriendshipMutation = () => {
  const [mutate, { loading }] = useMutation(FIND_OR_CREATE_FRIEND_QUERY)
  const findOrCreateFriendship = useCallback(
    async (input: { userAccountName: string; friendAccountName: string }) => {
      const { data } = await mutate({ variables: { input } })
      return data.findOrCreateFriendship as Friendship
    },
    [mutate]
  )
  return { mutate: findOrCreateFriendship, loading }
}
