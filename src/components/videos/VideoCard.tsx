"use client"

import { Box, Card, Typography } from "@mui/material"
import UserInfo from "./UserInfoCard"
import { Video } from "../../features/interfaces/video"

export interface VideoCardProps {
  video: Video
  isVideo?: boolean
  onClick?: () => void
}

export const VideoCard = ({ video, isVideo = false, onClick }: VideoCardProps) => {
  const { title, thumbnail, duration, author, avatar } = video

  return (
    <Card
      sx={{
        borderRadius: { xs: 1.5, sm: 2 },
        overflow: "hidden",
        backgroundColor: "transparent",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <Box sx={{ position: "relative" }}>
        {isVideo || thumbnail.toLowerCase().endsWith(".mp4") ? (
          <Box
            component="video"
            poster={thumbnail.endsWith(".mp4") ? undefined : thumbnail}
            sx={{
              borderRadius: { xs: 1.5, sm: 2 },
              objectFit: "cover",
              width: "100%",
              height: { xs: 140, sm: 160, md: 180 },
            }}
          >
            <source src={thumbnail} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </Box>
        ) : (
          <Box
            component="img"
            src={thumbnail}
            alt={title}
            sx={{
              borderRadius: { xs: 1.5, sm: 2 },
              objectFit: "cover",
              width: "100%",
              height: { xs: 140, sm: 160, md: 180 },
            }}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            px: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" color="white">
            {duration}
          </Typography>
        </Box>
      </Box>

      <UserInfo author={author} avatar={avatar || ""} title={title} sx={{ mt: { xs: 1.5, sm: 2 } }} />
    </Card>
  )
}

export default VideoCard
