import { Box, Typography } from "@mui/material"
import { VideoListItem } from "../video-list-item/video-list-item"
import { Video } from "../../../../features/interfaces/video"

interface DateGroupProps {
  date: string
  videos: Video[]
  onOpenVideo: (video: Video) => void
}

export const DateGroup = ({ date, videos, onOpenVideo }: DateGroupProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          borderLeft: 4,
          borderColor: "primary.main",
          pl: 2,
          py: 0.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {date}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {videos.map((video) => (
          <VideoListItem key={video.id} video={video} onOpenVideo={onOpenVideo} />
        ))}
      </Box>
    </Box>
  )
}

export default DateGroup
