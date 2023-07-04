import { useMutation, useQuery } from "@apollo/client"
import { ACCOUNT_BY_USERNAME_QUERY, CREATE_ACCOUNT_MUTATION } from "./graphql"
import { useCallback } from "react"
import { Account } from "../types/account"

export const useCreateAccount = () => {
  const [mutate, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION)
  const createAccount = useCallback(
    async (input: { username: string }) => {
      const { data } = await mutate({ variables: { input } })
      return data.createAccount.id
    },
    [mutate]
  )
  return { mutate: createAccount, loading }
}

export const useFetchAccount = (username: string) => {
  const { data, loading, error } = useQuery(ACCOUNT_BY_USERNAME_QUERY, {
    fetchPolicy: "network-only",
    variables: { username }
  })
  return { data: data?.account as Account | undefined, loading, error }
}
