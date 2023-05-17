import { Box, Typography } from "@mui/material"
import React, { FC } from "react"
import StandardContainer from "../../containers/StandardContainer"
import { MomentBrief } from "../../types/moment"
import MomentCard from "../../components/MomentCard"

export interface HomePageProps {
  moments: Array<MomentBrief>
  currentFilter: string
  filterOptions: Array<{
    text: string
    filter: string
    onClick: () => void
  }>
  onMomentLike: (id: string) => void
  onMomentUnlike: (id: string) => void
  onMomentOpen: (id: string) => void
  onMomentChat: (username: string, character: string) => void
  onMomentReport: (id: string) => void
}

const HomePage: FC<HomePageProps> = ({
  moments,
  currentFilter,
  filterOptions,
  onMomentLike,
  onMomentUnlike,
  onMomentOpen,
  onMomentChat,
  onMomentReport
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <StandardContainer
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          p: 1
        }}
      >
        <Box sx={{ display: "flex" }}>
          {filterOptions.map(({ text, filter, onClick }) => (
            <Box
              key={text}
              onClick={onClick}
              sx={{
                paddingX: { xs: 1, md: 1.5 },
                paddingY: 0.5,
                marginX: { xs: 1, md: 1.5 },
                backgroundColor:
                  currentFilter === filter ? "primary.dark" : "transparent",
                borderRadius: "5px",
                cursor: "pointer",
                "&::-webkit-scrollbar": {
                  height: "0px !important"
                }
              }}
            >
              <Typography
                variant={"h6"}
                sx={{
                  color:
                    currentFilter === filter
                      ? "primary.extraLight"
                      : "primary.dark"
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </StandardContainer>
      <StandardContainer
        sx={{
          mt: { xs: 1.5, sm: 3 },
          flex: 1,
          overflowX: "hidden"
        }}
      >
        {moments.map((moment, index) => (
          <Box
            key={moment.id}
            sx={{
              mb: { xs: 1.5, md: 3 },
              pb: { xs: 1.5, md: 3 },
              borderBottom: "1px solid",
              borderColor:
                index !== moments.length - 1 ? "primary.main" : "transparent"
            }}
          >
            <MomentCard
              moment={moment}
              onLike={() => onMomentLike(moment.id)}
              onUnlike={() => onMomentUnlike(moment.id)}
              onOpen={() => onMomentOpen(moment.id)}
              onChat={() =>
                onMomentChat(moment.username, moment.character.name)
              }
              onReport={() => onMomentReport(moment.id)}
            />
          </Box>
        ))}
      </StandardContainer>
    </Box>
  )
}

export default HomePage
