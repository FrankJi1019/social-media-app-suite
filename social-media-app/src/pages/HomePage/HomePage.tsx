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
}

const HomePage: FC<HomePageProps> = ({
  moments,
  currentFilter,
  filterOptions,
  onMomentLike,
  onMomentUnlike,
  onMomentOpen
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <StandardContainer
        sx={{ p: 1, display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ display: "flex" }}>
          {filterOptions.map(({ text, filter, onClick }) => (
            <Box
              key={text}
              onClick={onClick}
              sx={{
                paddingX: 1.4,
                paddingY: 0.4,
                marginX: 1.5,
                backgroundColor:
                  currentFilter === filter ? "primary.dark" : "transparent",
                borderRadius: "5px",
                cursor: "pointer"
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
          mt: 3,
          paddingY: 2,
          paddingX: 3,
          flex: 1,
          overflowX: "hidden"
        }}
      >
        {moments.map((moment, index) => (
          <Box
            key={moment.id}
            sx={{
              mb: 3,
              pb: 3,
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
            />
          </Box>
        ))}
      </StandardContainer>
    </Box>
  )
}

export default HomePage
