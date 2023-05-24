import React, { FC, ReactNode, useEffect, useMemo, useState } from "react"
import { Box, Grid, IconButton, SxProps } from "@mui/material"
import StandardContainer from "./../StandardContainer"
import { User } from "../../providers/CognitoAuthProvider"
// @ts-ignore
// @ts-ignore
import profile from "../../assets/placeholders/profile-placeholder.jpg"
import AuthBlock from "../../components/AuthBlock"
import HomeIcon from "@mui/icons-material/Home"
import TextsmsIcon from "@mui/icons-material/Textsms"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import PersonIcon from "@mui/icons-material/Person"
import { Friendship } from "../../types/friend"
import UserAvatar from "../../components/UserAvatar"

export interface PageProps {
  children?: ReactNode
  user?: User
  title?: string
  sx?: SxProps
  loading?: boolean
  friends?: Array<Friendship>
  hideMobileNavBar?: boolean
  onPostNew: () => void
  onLogin?: () => void
  onRegister?: () => void
  onSignOut?: () => void
  onFriendAvatarClick: (username: string) => Promise<void>
  onRunUnauthenticatedAction: () => void
  onReportMoment: (momentId: string, reason: string) => void
}

const Page: FC<PageProps> = ({
  user,
  title = "[IncognitoNet]",
  friends = [],
  loading = false,
  sx,
  onLogin = () => {},
  onRegister = () => {},
  children,
  onSignOut = () => {},
  onFriendAvatarClick,
  onPostNew,
  hideMobileNavBar = false
}) => {
  const [currentSection, setCurrentSection] = useState<
    "main" | "friends" | "profile"
  >("main")

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
        onClick: onPostNew
      },
      {
        title: "profile",
        icon: <PersonIcon />,
        onClick: () => setCurrentSection("profile")
      }
    ],
    [onPostNew]
  )

  useEffect(() => {
    document.title = title
  }, [title])

  const mainContent = useMemo(() => {
    if (currentSection === "main") {
      return children
    } else if (currentSection === "friends") {
      return (
        <Box>
          {friends?.map(
            ({ friendAccount: { username }, friendCharacter: { name } }) => (
              <Box key={username} sx={{ pb: 2 }}>
                <UserAvatar
                  profile={profile}
                  name={name}
                  onClick={() => onFriendAvatarClick(username)}
                />
              </Box>
            )
          )}
        </Box>
      )
    } else {
      return <Box>To be implemented</Box>
    }
  }, [children, currentSection, friends, onFriendAvatarClick])

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
        <Box sx={{ display: { xs: "none", sm: "block", md: "none" }, p: 2 }}>
          <AuthBlock
            avatarOptions={
              user && {
                name: user.Username as string,
                profile,
                avatarStyle: "rounded",
                reverseAlign: false
              }
            }
            onPostNew={user && onPostNew}
            onLogin={user ? undefined : onLogin}
            onRegister={user ? undefined : onRegister}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          {friends?.map(
            ({ friendAccount: { username }, friendCharacter: { name } }) => (
              <Box key={username} sx={{ pb: 2 }}>
                <UserAvatar
                  profile={profile}
                  name={name}
                  onClick={() => onFriendAvatarClick(username)}
                />
              </Box>
            )
          )}
        </Box>
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
                sm: 3,
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
          {!hideMobileNavBar && (
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
          )}
        </Grid>
        <Grid
          item
          md={3}
          sx={{ display: { xs: "none", md: "flex" }, p: 4, flex: 1 }}
        >
          <StandardContainer sx={{ flex: 1, p: { md: 1.5, lg: 3 } }}>
            <AuthBlock
              avatarOptions={
                user && {
                  name: user.Username as string,
                  profile,
                  avatarStyle: "rounded",
                  reverseAlign: true
                }
              }
              onPostNew={user && onPostNew}
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
