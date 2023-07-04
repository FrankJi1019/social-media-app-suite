import React, { FC, useState } from "react"
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import StandardFormContainer from "../../containers/StandardFormContainer"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useFormik } from "formik"
import FormError from "../FormError"
import { LoadingButton } from "@mui/lab"

export interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => void
  onNavigateLogin: () => void
}

const RegisterForm: FC<RegisterFormProps> = ({
  onRegister,
  onNavigateLogin
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const theme = useTheme()
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ username, email, password }) => {
      setIsRegistering(true)
      try {
        await onRegister(username, email, password)
      } catch (e: any) {
        setError((e as Error).message)
      } finally {
        setIsRegistering(false)
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
          Get start with IncognitoNet
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
          placeholder={"EMAIL"}
          name={"email"}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "bg.pure" }}
        />
      </Box>
      <Box>
        <FormControl
          fullWidth
          size={"small"}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            "& fieldset": { border: "none" }
          }}
        >
          <OutlinedInput
            name={"password"}
            onChange={formik.handleChange}
            type={showPassword ? "text" : "password"}
            placeholder={"PASSWORD"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box>
        <Typography variant={"body2"}>
          Already got an account?{" "}
          <span
            style={{
              color: "red",
              cursor: "pointer"
            }}
            onClick={onNavigateLogin}
          >
            Login
          </span>{" "}
          now!
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormError message={error} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          loading={isRegistering}
          type={"submit"}
          variant={"contained"}
        >
          Register
        </LoadingButton>
      </Box>
    </StandardFormContainer>
  )
}

export default RegisterForm
