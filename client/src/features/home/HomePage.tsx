import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import {
    CalendarMonth,
    EmojiEvents,
    Explore,
    Group,
    LocationOn,
    TrendingUp,
} from "@mui/icons-material";
import { NavLink } from "react-router";

const features = [
    {
        icon: <Explore sx={{ fontSize: 40 }} />,
        title: "Discover Activities",
        description:
            "Browse a wide range of community activities happening near you — from sports to arts and beyond.",
    },
    {
        icon: <Group sx={{ fontSize: 40 }} />,
        title: "Meet People",
        description:
            "Connect with like-minded individuals, grow your network, and build lasting friendships.",
    },
    {
        icon: <EmojiEvents sx={{ fontSize: 40 }} />,
        title: "Host Events",
        description:
            "Create and manage your own activities, invite others, and build your community.",
    },
];

const stats = [
    { label: "Activities", value: "500+", icon: <CalendarMonth /> },
    { label: "Members", value: "2.4k", icon: <Group /> },
    { label: "Cities", value: "30+", icon: <LocationOn /> },
    { label: "Growing", value: "Daily", icon: <TrendingUp /> },
];

export default function HomePage() {
    return (
        <Box>
            {/* ── Hero ── */}
            <Box
                sx={{
                    mx: { xs: -2, sm: -3 },
                    mt: -3,
                    background:
                        "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 100%)",
                    position: "relative",
                    overflow: "hidden",
                    py: { xs: 10, md: 14 },
                    px: 3,
                    textAlign: "center",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-40%",
                        left: "-10%",
                        width: "60%",
                        height: "200%",
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
                        pointerEvents: "none",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-30%",
                        right: "-5%",
                        width: "50%",
                        height: "160%",
                        background:
                            "radial-gradient(circle, rgba(32,167,172,0.18) 0%, transparent 65%)",
                        pointerEvents: "none",
                    },
                }}
            >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Chip
                        label="🎉 Community-Driven Platform"
                        size="small"
                        sx={{
                            mb: 3,
                            bgcolor: "rgba(255,255,255,0.15)",
                            color: "white",
                            fontWeight: 600,
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                        }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Group sx={{ fontSize: 56, color: "rgba(255,255,255,0.9)" }} />
                    </Box>

                    <Typography
                        variant="h2"
                        fontWeight={800}
                        color="white"
                        sx={{
                            fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
                            lineHeight: 1.15,
                            mb: 2,
                            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        Welcome to{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #a8edea, #fed6e3)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Reactivities
                        </Box>
                    </Typography>

                    <Typography
                        variant="h6"
                        color="rgba(255,255,255,0.82)"
                        sx={{
                            maxWidth: 560,
                            mx: "auto",
                            mb: 5,
                            fontWeight: 400,
                            lineHeight: 1.7,
                        }}
                    >
                        Discover events, connect with people, and create unforgettable
                        experiences — all in one place.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            component={NavLink}
                            to="/activities"
                            variant="contained"
                            size="large"
                            startIcon={<Explore />}
                            sx={{
                                bgcolor: "white",
                                color: "#182a73",
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontSize: "1rem",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.9)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            Browse Activities
                        </Button>

                        <Button
                            component={NavLink}
                            to="/createActivity"
                            variant="outlined"
                            size="large"
                            startIcon={<EmojiEvents />}
                            sx={{
                                color: "white",
                                borderColor: "rgba(255,255,255,0.6)",
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontSize: "1rem",
                                backdropFilter: "blur(6px)",
                                bgcolor: "rgba(255,255,255,0.08)",
                                "&:hover": {
                                    borderColor: "white",
                                    bgcolor: "rgba(255,255,255,0.16)",
                                    transform: "translateY(-2px)",
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            Create Activity
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* ── Stats bar ── */}
            <Box
                sx={{
                    mx: { xs: -2, sm: -3 },
                    bgcolor: "#182a73",
                    py: 3,
                    px: 3,
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={2} justifyContent="center">
                        {stats.map((s) => (
                            <Grid size={{ xs: 6, sm: 3 }} key={s.label}>
                                <Stack
                                    alignItems="center"
                                    spacing={0.5}
                                    sx={{ color: "white" }}
                                >
                                    <Box sx={{ color: "#20a7ac" }}>{s.icon}</Box>
                                    <Typography fontWeight={800} fontSize="1.5rem">
                                        {s.value}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}
                                    >
                                        {s.label}
                                    </Typography>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── Features ── */}
            <Box sx={{ py: 8, px: 1 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 1, color: "#182a73" }}
                >
                    Everything you need
                </Typography>
                <Typography
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mb: 5, maxWidth: 480, mx: "auto" }}
                >
                    A platform built around community, connection, and shared experiences.
                </Typography>

                <Grid container spacing={3}>
                    {features.map((f) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={f.title}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 4,
                                    p: 1,
                                    transition: "all 0.25s ease",
                                    cursor: "default",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow:
                                            "0 12px 40px rgba(24,42,115,0.12)",
                                        borderColor: "#218aae",
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: "center", py: 4 }}>
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            p: 2,
                                            borderRadius: 3,
                                            background:
                                                "linear-gradient(135deg, #182a73, #20a7ac)",
                                            color: "white",
                                            mb: 2,
                                        }}
                                    >
                                        {f.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        gutterBottom
                                        sx={{ color: "#182a73" }}
                                    >
                                        {f.title}
                                    </Typography>
                                    <Typography color="text.secondary" variant="body2">
                                        {f.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* ── CTA Banner ── */}
            <Box
                sx={{
                    mx: { xs: -2, sm: -3 },
                    background:
                        "linear-gradient(135deg, #20a7ac 0%, #218aae 50%, #182a73 100%)",
                    py: 7,
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={800}
                    color="white"
                    sx={{ mb: 1.5 }}
                >
                    Ready to get started?
                </Typography>
                <Typography
                    color="rgba(255,255,255,0.8)"
                    sx={{ mb: 4, fontSize: "1.05rem" }}
                >
                    Join hundreds of people already using Reactivities.
                </Typography>
                <Button
                    component={NavLink}
                    to="/activities"
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: "white",
                        color: "#182a73",
                        fontWeight: 700,
                        px: 5,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: "1rem",
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.9)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Show My Activities
                </Button>
            </Box>
        </Box>
    );
}