import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router";

interface ServerErrorDetails {
  statusCode: number;
  message: string;
  details?: string;
}

export default function ServerError() {
  const { state } = useLocation();
  const error = state?.error as ServerErrorDetails | undefined;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        mt: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)",
        color: "white",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            background: "linear-gradient(135deg, #ff6b6b, #feca57)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          500
        </Typography>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Internal Server Error
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>
            Something went wrong on our end
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 3 }} />

      {/* Error message */}
      {error ? (
        <>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(255,107,107,0.15)",
              border: "1px solid rgba(255,107,107,0.3)",
              color: "#ff6b6b",
              fontWeight: 600,
            }}
          >
            {error.message}
          </Typography>

          {/* Stack trace accordion – only populated in dev mode */}
          {error.details && (
            <Accordion
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                color: "white",
                borderRadius: "12px !important",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:before": { display: "none" },
                mb: 3,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.7)" }} />}
              >
                <Typography fontWeight={600} sx={{ color: "rgba(255,255,255,0.85)" }}>
                  Stack Trace (Development Only)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  component="pre"
                  sx={{
                    fontSize: "0.72rem",
                    color: "#feca57",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    lineHeight: 1.6,
                    m: 0,
                    fontFamily: "monospace",
                  }}
                >
                  {error.details}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      ) : (
        <Typography sx={{ color: "rgba(255,255,255,0.65)", mb: 3 }}>
          An unexpected error occurred. Please try again.
        </Typography>
      )}

      {/* Actions */}
      <Box display="flex" gap={2}>
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
          Back to Activities
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
