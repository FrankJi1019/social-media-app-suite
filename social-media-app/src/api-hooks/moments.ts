import { useMutation, useQuery } from "@apollo/client"
import {
  ALL_MOMENTS_QUERY,
  LIKE_MOMENT_MUTATION,
  MOMENT_BY_ID_QUERY,
  POST_MOMENT_MUTATION,
  UNLIKE_MOMENT_MUTATION
} from "./graphql"
import { Moment, MomentBrief } from "../types/moment"
import { useMemo } from "react"
// @ts-ignore
import profilePlaceholder from "../assets/placeholders/profile-placeholder.jpg"
import { utcTimestampToDate } from "../utils/time"
import { Character } from "../types/character"
import { useAuth } from "../providers/CognitoAuthProvider"
import { Account } from "../types/account"

export const useFetchAllMoments = (input?: {
  category?: string
  followedBy?: string
}) => {
  const { data, loading, error, refetch } = useQuery(ALL_MOMENTS_QUERY, {
    fetchPolicy: "network-only",
    variables: { input }
  })

  const { getCurrentUser } = useAuth()
  const moments: Array<MomentBrief> = useMemo(() => {
    if (!data || loading) return []

    return data.moments.map(
      (moment: {
        id: string
        account: Account
        character: Character
        content: string
        createdAt: string
        likeNumber: number
        commentNumber: number
        isLiked: boolean
      }) => {
        return {
          ...moment,
          isOwnMoment: getCurrentUser()?.Username === moment.account.username,
          profile: profilePlaceholder,
          postDate: utcTimestampToDate(Number(moment.createdAt))
        } as MomentBrief
      }
    )
  }, [data, loading, getCurrentUser])
  return { data: moments, loading, error, reFetch: refetch }
}

export const useFetchMomentById = (id: string) => {
  const { data, loading, error, refetch } = useQuery(MOMENT_BY_ID_QUERY, {
    variables: { id }
  })

  const { getCurrentUser } = useAuth()
  const moment: Moment | undefined = useMemo(() => {
    return (
      data &&
      ({
        ...data.moment,
        profile: profilePlaceholder,
        postDate: utcTimestampToDate(Number(data.moment.createdAt)),
        comments: data.moment.comments.map(
          (comment: { createdAt: number; account: { username: string } }) => ({
            ...comment,
            commentDate: utcTimestampToDate(Number(comment.createdAt)),
            profile: profilePlaceholder,
            isOwnComment:
              getCurrentUser()?.Username === comment.account.username
          })
        )
      } as Moment)
    )
  }, [data, getCurrentUser])

  return { data: moment, loading, error, reFetch: refetch }
}

export const usePostMomentMutation = () => {
  const [mutate, { loading }] = useMutation(POST_MOMENT_MUTATION)
  const postMoment = async (input: {
    username: string
    character: string
    content: string
    tags: Array<string>
  }): Promise<string> => {
    const { data } = await mutate({
      variables: { input }
    })
    return data.createMoment.id
  }
  return { mutate: postMoment, loading }
}

export const useLikeMomentMutation = () => {
  const [mutate, { loading }] = useMutation(LIKE_MOMENT_MUTATION)
  const likeMoment = async (input: {
    momentId: number | string
    username: string
  }) => {
    const { data } = await mutate({ variables: { input } })
    return data.likeMoment.id
  }
  return { mutate: likeMoment, loading }
}

export const useUnlikeMomentMutation = () => {
  const [mutate, { loading }] = useMutation(UNLIKE_MOMENT_MUTATION)
  const unlikeMoment = async (input: {
    momentId: number | string
    username: string
  }) => {
    const { data } = await mutate({ variables: { input } })
    return data.unlikeMoment.id
  }
  return { mutate: unlikeMoment, loading }
}
