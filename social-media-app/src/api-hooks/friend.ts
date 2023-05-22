import { useMutation, useQuery } from "@apollo/client"
import {
  ADD_FRIEND_MUTATION,
  FETCH_FRIENDSHIP_BY_ID,
  FIND_OR_CREATE_FRIEND_MUTATION
} from "./graphql"
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
  const [mutate, { loading }] = useMutation(FIND_OR_CREATE_FRIEND_MUTATION)
  const findOrCreateFriendship = useCallback(
    async (input: { userAccountName: string; friendAccountName: string }) => {
      const { data } = await mutate({ variables: { input } })
      return data.findOrCreateFriendship as Friendship
    },
    [mutate]
  )
  return { mutate: findOrCreateFriendship, loading }
}

export const useFetchFriendshipById = (id: string | number) => {
  const { data, loading, error } = useQuery(FETCH_FRIENDSHIP_BY_ID, {
    variables: { id }
  })
  return { data: data?.friendship as Friendship | undefined, loading, error }
}
