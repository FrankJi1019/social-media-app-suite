import React, { FC, useState } from "react"
import { Box, TextField, Typography, useTheme } from "@mui/material"
import StandardFormContainer from "../../containers/StandardFormContainer"
import { useFormik } from "formik"
import FormError from "../FormError"
import { LoadingButton } from "@mui/lab"

export interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  onNavigateSignup: () => void
}

const Index: FC<LoginFormProps> = ({ onLogin, onNavigateSignup }) => {
  const [error, setError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async ({ username, password }) => {
      setIsLoggingIn(true)
      try {
        await onLogin(username, password)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoggingIn(false)
      }
    }
  })

  return (
    <StandardFormContainer onSubmit={formik.handleSubmit}>
      <Box>
        <Typography
          variant={"h3"}
          sx={{
            textAlign: "center",
            background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "KronaOne"
          }}
        >
          Login to IncognitoNet
        </Typography>
      </Box>
      <Box>
        <TextField
          placeholder={"USERNAME"}
          name={"username"}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "bg.pure" }}
        />
      </Box>
      <Box>
        <TextField
          placeholder={"PASSWORD"}
          type={"password"}
          name={"password"}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "bg.pure" }}
        />
      </Box>
      <Box>
        <Typography variant={"body2"}>
          No account yet?{" "}
          <span
            style={{
              color: "red",
              cursor: "pointer"
            }}
            onClick={onNavigateSignup}
          >
            Sign up
          </span>{" "}
          now!
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormError message={error} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", mb: "0 !important" }}
      >
        <LoadingButton
          loading={isLoggingIn}
          variant={"contained"}
          type={"submit"}
        >
          Login
        </LoadingButton>
      </Box>
    </StandardFormContainer>
  )
}

export default Index
