import { useMutation, useQuery } from "@apollo/client"
import { CREATE_COMMENT_MUTATION, MOMENT_COMMENTS_QUERY } from "./graphql"
import { useMemo } from "react"
import { useAuth } from "../providers/CognitoAuthProvider"

export const useCreateCommentMutation = () => {
  const [mutate, { loading }] = useMutation(CREATE_COMMENT_MUTATION)
  const createComment = async (input: {
    username: string
    character: string
    content: string
    momentId: number | string
  }): Promise<string> => {
    const { data } = await mutate({ variables: { input } })
    return data.createComment.id
  }
  return { mutate: createComment, loading }
}

export const useFetchCommentsByMoment = (momentId: string) => {
  const { data, loading, error } = useQuery(MOMENT_COMMENTS_QUERY, {
    variables: {
      input: { momentId }
    }
  })
  const { currentUser } = useAuth()
  const comments = useMemo(() => {
    return (
      data?.comments.map(
        (data: { createdAt: number; account: { username: string } }) => ({
          ...data,
          isOwnComment: currentUser?.Username === data.account.username
        })
      ) || []
    )
  }, [currentUser?.Username, data?.comments])
  return { data: comments, loading, error }
}
