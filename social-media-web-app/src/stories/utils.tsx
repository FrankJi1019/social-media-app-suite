import { ReactNode } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { themeData } from "../theme/theme"
import "../fonts.css"
import { BrowserRouter } from "react-router-dom"

declare module "@mui/material/styles" {
  interface PaletteColor {
    extraLight?: string
  }
  interface SimplePaletteColorOptions {
    extraLight?: string
  }
  interface Palette {
    bg: {
      primary: string
      secondary: string
      shadow: string
      pure: string
      oppositePure: string
    }
  }
  interface PaletteOptions {
    bg: {
      primary: string
      secondary: string
      shadow: string
      pure: string
      oppositePure: string
    }
  }
}

const theme = createTheme({
  ...themeData
})

export const Decorate = (component: ReactNode) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  </BrowserRouter>
)

export const FUNCTION_PLACE_HOLDER = () => {
  return {} as any
}
