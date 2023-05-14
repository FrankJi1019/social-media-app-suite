import { useQuery } from "@apollo/client"
import { ALL_CATEGORIES_QUERY } from "./graphql"
import { useMemo } from "react"
import { Category } from "../types/category"

export const useFetchAllCategories = () => {
  const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY, {
    fetchPolicy: "cache-first"
  })
  const categories = useMemo(
    () => (!data || loading ? [] : data.categories) as Array<Category>,
    [data, loading]
  )
  return { data: categories, loading, error }
}
