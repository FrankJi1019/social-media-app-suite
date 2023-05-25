import { useMutation } from "@apollo/client"
import { REPORT_MOMENT_MUTATION } from "./graphql"
import { useCallback } from "react"

export const useReportMomentMutation = () => {
  const [mutate, { loading, error }] = useMutation(REPORT_MOMENT_MUTATION)
  const reportMoment = useCallback(
    async (input: {
      momentId: string
      reporterUsername: string
      reason: string
    }) => {
      return await mutate({
        variables: { input }
      })
    },
    [mutate]
  )
  return { mutate: reportMoment, loading, error }
}
