import { useQuery } from "@apollo/client"
import { CHAT_HISTORY_QUERY } from "./graphql"
import { useMemo } from "react"
import { utcTimestampToDate } from "../utils/time"
import { Chat } from "../types/chat"

export const useFetchChatHistory = (input: { accountNames: Array<string> }) => {
  const { data, loading, error } = useQuery(CHAT_HISTORY_QUERY, {
    fetchPolicy: "network-only",
    variables: { input }
  })
  const chatHistory = useMemo(() => {
    if (!data || loading) return []
    return data.chats.map((chat: any) => ({
      ...chat,
      sentTime: utcTimestampToDate(Number(chat.createdAt))
    })) as Array<Chat>
  }, [data, loading])

  return { data: chatHistory, loading, error }
}
