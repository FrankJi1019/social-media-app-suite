import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { Box, Grid, IconButton, SxProps } from "@mui/material"
import StandardContainer from "./../StandardContainer"
import { User } from "../../providers/CognitoAuthProvider"
// @ts-ignore
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../routes/routes"
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"
import AuthBlock from "../../components/AuthBlock"
import HomeIcon from "@mui/icons-material/Home"
import TextsmsIcon from "@mui/icons-material/Textsms"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import PersonIcon from "@mui/icons-material/Person"

export interface PageProps {
  user?: User
  title?: string
  sx?: SxProps
  loading?: boolean
  friends?: Array<{ id: string; profile: string; name: string }>
  onLogin?: () => void
  onRegister?: () => void
  onSignOut?: () => void
  children: ReactNode
}

const Page: FC<PageProps> = ({
  user,
  title = "[IncognitoNet]",
  // friends = [],
  loading = false,
  sx,
  onLogin = () => {},
  onRegister = () => {},
  children,
  onSignOut = () => {}
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [currentSection, setCurrentSection] = useState<
    "main" | "friends" | "profile"
  >("main")

  const postNewMomentHandler = useCallback(() => {
    if (pathname === Routes.POST_MOMENT_PAGE.path) return
    navigate({
      pathname: Routes.POST_MOMENT_PAGE.path
    })
  }, [navigate, pathname])

  const mobileNavBarOptions = useMemo(
    () => [
      {
        title: "main",
        icon: <HomeIcon />,
        onClick: () => setCurrentSection("main")
      },
      {
        title: "friends",
        icon: <TextsmsIcon />,
        onClick: () => setCurrentSection("friends")
      },
      {
        title: "new",
        icon: <ControlPointIcon />,
        onClick: postNewMomentHandler
      },
      {
        title: "profile",
        icon: <PersonIcon />,
        onClick: () => setCurrentSection("profile")
      }
    ],
    [postNewMomentHandler]
  )

  useEffect(() => {
    document.title = title
  }, [title])

  const mainContent = useMemo(() => {
    if (currentSection === "main") {
      return children
    } else if (currentSection === "friends") {
      return <Box>To be implemented</Box>
    } else {
      return <Box>To be implemented</Box>
    }
  }, [children, currentSection])

  if (loading) return <Box>Loading...</Box>

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "bg.primary",
        ...(sx || {})
      }}
    >
      <Grid
        item
        sm={3}
        md={2}
        sx={{ display: { xs: "none", sm: "block" }, backgroundColor: "white" }}
      >
        <Box sx={{ display: { xs: "none", sm: "block", md: "none" } }}>
          <AuthBlock
            avatarOptions={
              user && {
                name: user.Username as string,
                profile,
                avatarStyle: "rounded",
                reverseAlign: false
              }
            }
            onPostNew={user && postNewMomentHandler}
            onSignOut={user && onSignOut}
            onLogin={user ? undefined : onLogin}
            onRegister={user ? undefined : onRegister}
          />
        </Box>
        <Box>To Be Implemented123</Box>
      </Grid>

      <Grid
        xs={12}
        sm={9}
        md={10}
        item
        container
        sx={{
          flex: 1,
          "&>*": {
            minHeight: "100vh"
          }
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: {
                xs: 2,
                md: 4
              },
              pr: {
                md: 0
              },
              overflow: "hidden",
              "&>*": { height: "100%" }
            }}
          >
            {mainContent}
          </Box>
          <Box
            sx={{
              paddingX: 1.5,
              paddingY: 0.5,
              display: { xs: "flex", sm: "none" },
              justifyContent: "space-around",
              backgroundColor: "bg.pure"
            }}
          >
            {mobileNavBarOptions.map(({ title, icon, onClick }) => (
              <Box key={title} onClick={onClick}>
                <IconButton
                  sx={{
                    color:
                      title === currentSection ? "primary.dark" : "grey.A700"
                  }}
                >
                  {icon}
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sx={{ display: { xs: "none", md: "flex" }, p: 4, flex: 1 }}
        >
          <StandardContainer sx={{ flex: 1 }}>
            <AuthBlock
              avatarOptions={
                user && {
                  name: user.Username as string,
                  profile,
                  avatarStyle: "rounded",
                  reverseAlign: true
                }
              }
              onPostNew={user && postNewMomentHandler}
              onSignOut={user && onSignOut}
              onLogin={user ? undefined : onLogin}
              onRegister={user ? undefined : onRegister}
            />
          </StandardContainer>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Page
