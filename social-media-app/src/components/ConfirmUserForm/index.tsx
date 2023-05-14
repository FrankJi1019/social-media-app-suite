import React, { FC, useCallback, useState } from "react"
import { Box, TextField, Typography, useTheme } from "@mui/material"
import StandardFormContainer from "../../containers/StandardFormContainer"
import FormError from "../FormError"
import { LoadingButton } from "@mui/lab"

export interface ConfirmUserFormProps {
  username: string
  email: string
  onConfirm: (code: string) => void
}

const ConfirmUserForm: FC<ConfirmUserFormProps> = ({
  username,
  email,
  onConfirm
}) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)

  const theme = useTheme()

  const confirmUserHandler = useCallback(async () => {
    setIsConfirming(true)
    try {
      await onConfirm(code)
    } catch (e: any) {
      setError((e as Error).message)
    } finally {
      setIsConfirming(false)
    }
  }, [code, onConfirm])

  return (
    <StandardFormContainer onSubmit={confirmUserHandler}>
      <Box>
        <Typography
          variant={"h4"}
          sx={{
            textAlign: "center",
            background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Confirm your account
        </Typography>
      </Box>
      <Box>
        <Typography variant={"body2"} sx={{ color: "rgba(0,0,0,.7)" }}>
          Hi {username}, your confirmation code has been emailed to {email}
        </Typography>
      </Box>
      <Box>
        <TextField
          placeholder={"Enter your confirmation code"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormError message={error} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isConfirming}
          variant={"contained"}
          type={"submit"}
        >
          Confirm
        </LoadingButton>
      </Box>
    </StandardFormContainer>
  )
}

export default ConfirmUserForm
