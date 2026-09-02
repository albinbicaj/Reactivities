import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper
      sx={{
        p: 6,
        mt: 6,
        textAlign: "center",
        borderRadius: 4,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "white",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "8rem",
          fontWeight: 900,
          background: "linear-gradient(135deg, #6c63ff, #3ecf8e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
        Oops – page not found
      </Typography>

      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.65)", mb: 4 }}>
        The resource you were looking for could not be found. It may have been
        deleted or the URL may be incorrect.
      </Typography>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

      <Box display="flex" gap={2} justifyContent="center">
        <Button
          component={Link}
          to="/activities"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #6c63ff, #3ecf8e)",
            color: "white",
            fontWeight: 700,
            px: 4,
            borderRadius: 3,
            "&:hover": { opacity: 0.88 },
          }}
        >
          Go to Activities
        </Button>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            borderColor: "rgba(255,255,255,0.3)",
            color: "white",
            px: 4,
            borderRadius: 3,
            "&:hover": { borderColor: "white" },
          }}
        >
          Home
        </Button>
      </Box>
    </Paper>
  );
}
