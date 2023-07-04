import { useQuery } from "@apollo/client"
import { ALL_CHARACTERS_QUERY } from "./graphql"
import { useMemo } from "react"

export const useFetchAllCharacters = () => {
  const { data, loading, error } = useQuery(ALL_CHARACTERS_QUERY, {
    fetchPolicy: "cache-first"
  })
  const characters: Array<string> = useMemo(
    () =>
      !loading && data
        ? (data.characters as Array<{ name: string }>).map(({ name }) => name)
        : [],
    [data, loading]
  )
  return { data: characters, loading, error }
}
