import { Box, Avatar, Typography, type SxProps, type Theme } from "@mui/material"

export interface UserInfoProps {
  author: string
  avatar: string
  title?: string
  sx?: SxProps<Theme>
}

export const UserInfo = ({
  author,
  avatar,
  title = "Aca se encontrará el título de los videos",
  sx,
}: UserInfoProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <Avatar
        src={avatar}
        alt={author}
        sx={{
          width: { xs: 28, sm: 32 },
          height: { xs: 28, sm: 32 },
          mr: 1,
        }}
      />
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
        >
          Autor del Video: {author}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserInfo
