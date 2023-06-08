import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import {
  ALL_MOMENTS_QUERY,
  LIKE_MOMENT_MUTATION,
  MOMENT_BY_ID_QUERY,
  POST_MOMENT_MUTATION,
  UNLIKE_MOMENT_MUTATION
} from "./graphql"
import { Moment, MomentBrief } from "../types/moment"
import { useCallback, useMemo, useState } from "react"
// @ts-ignore
import profilePlaceholder from "../assets/placeholders/profile-placeholder.jpg"
import { utcTimestampToDate } from "../utils/time"
import { Character } from "../types/character"
import { useAuth } from "../providers/CognitoAuthProvider"
import { Account } from "../types/account"
import { useMutation as useRestMutation } from "react-query"
import axios from "axios"

const REST_BASE_URL = process.env.REACT_APP_REST_URL as string

export const useFetchAllMoments = (input?: {
  category?: string
  followedBy?: string
}) => {
  const { data, loading, error, refetch } = useQuery(ALL_MOMENTS_QUERY, {
    fetchPolicy: "network-only",
    variables: { input }
  })

  const { currentUser } = useAuth()
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
        images: Array<string>
      }) => {
        return {
          ...moment,
          isOwnMoment: currentUser?.Username === moment.account.username,
          profile: profilePlaceholder,
          postDate: utcTimestampToDate(Number(moment.createdAt))
        } as MomentBrief
      }
    )
  }, [data, loading, currentUser])
  return { data: moments, loading, error, reFetch: refetch }
}

export const useFetchMomentById = (id: string) => {
  const { data, loading, error, refetch } = useQuery(MOMENT_BY_ID_QUERY, {
    variables: { id }
  })

  const { currentUser } = useAuth()
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
            isOwnComment: currentUser?.Username === comment.account.username
          })
        )
      } as Moment)
    )
  }, [data, currentUser])

  return { data: moment, loading, error, reFetch: refetch }
}

export const useLazyFetchMomentById = () => {
  const [fetch, { data, loading, error, called }] =
    useLazyQuery(MOMENT_BY_ID_QUERY)
  const fetchMoment = useCallback(
    async (id: string) => {
      const data = await fetch({
        fetchPolicy: "network-only",
        variables: { id }
      })
      return data.data.moment as Moment
    },
    [fetch]
  )
  return { fetch: fetchMoment, loading, data, error, called }
}

export const usePostMomentMutation = () => {
  const [mutate] = useMutation(POST_MOMENT_MUTATION)
  const [loading, setLoading] = useState(false)
  const { getAccessTokenWithoutRefresh } = useAuth()
  const postMomentData = useCallback(
    async (input: {
      username: string
      character: string
      content: string
      tags: Array<string>
    }): Promise<string> => {
      const { data } = await mutate({
        variables: { input }
      })
      return data.createMoment.id
    },
    [mutate]
  )
  const { mutateAsync: postMomentImages } = useRestMutation(
    async ({
      momentId,
      images
    }: {
      momentId: string
      images: Array<FormData>
    }) => {
      const postImagePromise = images.map((image, index) => {
        const token = getAccessTokenWithoutRefresh()
        return axios.post(
          `${REST_BASE_URL}/moments/${momentId}/images/${index}`,
          image,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      })
      await Promise.all(postImagePromise)
    }
  )
  const postMoment = useCallback(
    async ({
      username,
      character,
      content,
      tags,
      images
    }: {
      username: string
      character: string
      content: string
      tags: Array<string>
      images: Array<FormData>
    }) => {
      setLoading(true)
      const momentId = await postMomentData({
        username,
        character,
        content,
        tags
      })
      await postMomentImages({ momentId, images })
      setLoading(false)
      return momentId
    },
    [postMomentData, postMomentImages]
  )
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
