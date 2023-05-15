import { createTheme } from "@mui/material"
import { themeData } from "./theme"

declare module "@mui/material/styles" {
  interface PaletteColor {
    extraLight?: string
  }
  interface SimplePaletteColorOptions {
    extraLight?: string
  }
  interface Palette {
    bg: { primary: string; secondary: string; shadow: string; pure: string }
  }
  interface PaletteOptions {
    bg: { primary: string; secondary: string; shadow: string; pure: string }
  }
}

export const theme = createTheme({ ...themeData })
