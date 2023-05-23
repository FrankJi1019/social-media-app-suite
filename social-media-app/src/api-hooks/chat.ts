import { useLazyQuery } from "@apollo/client"
import { CHAT_HISTORY_QUERY } from "./graphql"
import { useCallback, useMemo } from "react"
import { utcTimestampToDate } from "../utils/time"
import { Chat } from "../types/chat"

export const useLazyFetchChatHistory = () => {
  const [fetch, { data, loading, error, called }] =
    useLazyQuery(CHAT_HISTORY_QUERY)
  const fetchChatHistory = useCallback(
    async (input: { accountNames: Array<string> }) => {
      await fetch({
        fetchPolicy: "network-only",
        variables: { input }
      })
    },
    [fetch]
  )
  const chatHistory = useMemo(() => {
    if (!data || loading) return []
    return data.chats.map((chat: any) => ({
      ...chat,
      sentTime: utcTimestampToDate(Number(chat.createdAt))
    })) as Array<Chat>
  }, [data, loading])

  return { data: chatHistory, loading, error, fetch: fetchChatHistory, called }
}
