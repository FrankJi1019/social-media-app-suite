import { useQuery } from "@apollo/client"
import { ALL_TAGS_QUERY } from "./graphql"
import { useMemo } from "react"

export const useFetchAllTags = () => {
  const { data, loading, error } = useQuery(ALL_TAGS_QUERY)
  const tags = useMemo(
    () => ((data && data.tags) || []) as Array<{ name: string; id: string }>,
    [data]
  )
  return { data: tags, loading, error }
}
