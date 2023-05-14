import React, { FC, ReactNode, useCallback, useEffect } from "react"
import {
  Box,
  Button,
  Drawer,
  Grid,
  SxProps,
  // TextField,
  Typography
} from "@mui/material"
import UserAvatar from "../../components/UserAvatar"
import StandardContainer from "./../StandardContainer"
import { User } from "../../providers/CognitoAuthProvider"
// @ts-ignore
import profilePlaceholder from "../../assets/placeholders/profile-placeholder.jpg"
import CreateIcon from "@mui/icons-material/Create"
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "../../routes/routes"

export interface PageProps {
  user?: User
  title?: string
  sx?: SxProps
  loading?: boolean
  excludeFriendDrawer?: boolean
  friends?: Array<{ id: string; profile: string; name: string }>
  onLogin?: () => void
  onRegister?: () => void
  onSignOut?: () => void
  children: ReactNode
}

const drawerWidth = 270

const AuthenticatedSideBar: FC<{
  username: string
  onPostNew: () => void
  onSignOut: () => void
}> = ({ username, onPostNew, onSignOut }) => {
  return (
    <Box
      sx={{
        height: "100%",
        paddingX: 3,
        paddingY: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <Box
          sx={{ pb: 2, borderBottom: "1px solid", borderColor: "primary.main" }}
        >
          <UserAvatar
            profile={profilePlaceholder}
            name={username}
            reverseAlign
            avatarStyle={"rounded"}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={onPostNew}
            startIcon={<CreateIcon />}
            variant={"outlined"}
            sx={{ width: "100%" }}
          >
            Write Something
          </Button>
        </Box>
      </Box>
      <Box>
        <Button onClick={onSignOut} variant={"outlined"} sx={{ width: "100%" }}>
          Sign Out
        </Button>
      </Box>
    </Box>
  )
}

const UnAuthenticatedSideBar: FC<{
  onLogin: () => void
  onRegister: () => void
}> = ({ onLogin, onRegister }) => {
  return (
    <Box sx={{ paddingX: 3, paddingY: 2 }}>
      <Box sx={{ pb: 4 }}>
        <Typography variant={"h3"} sx={{ textAlign: "center" }}>
          Join us now!
        </Typography>
      </Box>
      <Box sx={{ pb: 2 }}>
        <Button onClick={onRegister} sx={{ width: "100%" }}>
          Register
        </Button>
      </Box>
      <Box>
        <Button onClick={onLogin} variant={"outlined"} sx={{ width: "100%" }}>
          Login
        </Button>
      </Box>
    </Box>
  )
}

const Page: FC<PageProps> = ({
  user,
  title = "[IncognitoNet]",
  friends = [],
  loading = false,
  sx,
  excludeFriendDrawer = false,
  onLogin = () => {},
  onRegister = () => {},
  children,
  onSignOut = () => {}
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const postNewMomentHandler = useCallback(() => {
    if (pathname === Routes.POST_MOMENT_PAGE.path) return
    navigate({
      pathname: Routes.POST_MOMENT_PAGE.path
    })
  }, [navigate, pathname])

  useEffect(() => {
    document.title = title
  }, [title])

  if (loading) return <Box>Loading...</Box>

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "bg.primary",
        ...(sx || {})
      }}
    >
      {!excludeFriendDrawer && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth
            }
          }}
        >
          To Be Implemented
          {/*<Box sx={{ p: 2 }}>*/}
          {/*  <Box sx={{ mb: 4 }}>*/}
          {/*    <TextField*/}
          {/*      placeholder={"Search"}*/}
          {/*      sx={{*/}
          {/*        backgroundColor: "bg.primary",*/}
          {/*        border: "1px solid transparent",*/}
          {/*        borderColor: "primary.main"*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </Box>*/}
          {/*  <Box>*/}
          {/*    {friends.map(({ id, profile, name }) => (*/}
          {/*      <Box key={id} sx={{ mb: 2 }}>*/}
          {/*        <UserAvatar profile={profile} name={name} />*/}
          {/*      </Box>*/}
          {/*    ))}*/}
          {/*  </Box>*/}
          {/*</Box>*/}
        </Drawer>
      )}
      <Grid
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
          xs={9}
          sx={{
            maxHeight: "100vh",
            overflow: "hidden",
            "&>*": { height: "100%" },
            p: 4,
            pr: 0
          }}
        >
          {children}
        </Grid>
        <Grid item xs={3} sx={{ display: "flex" }}>
          <Box sx={{ p: 4, flex: 1, display: "flex" }}>
            <StandardContainer sx={{ flex: 1 }}>
              {user ? (
                <AuthenticatedSideBar
                  username={user.Username as string}
                  onPostNew={postNewMomentHandler}
                  onSignOut={onSignOut}
                />
              ) : (
                <UnAuthenticatedSideBar
                  onLogin={onLogin}
                  onRegister={onRegister}
                />
              )}
            </StandardContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Page
