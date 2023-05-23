import { useMutation } from "@apollo/client"
import { CREATE_ACCOUNT_MUTATION } from "./graphql"
import { useCallback } from "react"

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
