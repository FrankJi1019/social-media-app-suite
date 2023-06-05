import { ThemeOptions } from "@mui/material"

export const themeData = {
  palette: {
    primary: {
      extraLight: "#EEF2F7",
      light: "#ccdae5",
      main: "#6B91B6",
      dark: "#436689"
    },
    secondary: {
      extraLight: "#F8F1ED",
      light: "#ead6c8",
      main: "#DAB69B",
      dark: "#ba7845"
    },
    bg: {
      primary: "#EEF2F7",
      secondary: "#FFFFFF",
      shadow: "#959DA544",
      pure: "#FFFFFF",
      oppositePure: "#000000"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    },
    MuiTextField: {
      variants: [
        {
          props: { multiline: true },
          style: {
            textarea: {
              lineHeight: "1.5"
            }
          }
        }
      ],
      defaultProps: {
        fullWidth: true,
        size: "small"
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: "5px",
          // border: "1px solid #757575",
          fieldset: {
            border: "none"
          }
        }
      }
    }
  },
  typography: {
    fontFamily: "NunitoRegular",
    h1: {
      fontSize: "38px"
    },
    h2: {
      fontSize: "32px"
    },
    h3: {
      fontSize: "28px"
    },
    h4: {
      fontSize: "24px"
    },
    h5: {
      fontSize: "20px"
    },
    h6: {
      fontSize: "16px"
    },
    subtitle1: {
      fontSize: "16px"
    },
    subtitle2: {
      fontSize: "14px"
    }
  }
} as ThemeOptions
