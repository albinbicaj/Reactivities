import { Box, Card, Typography, Avatar, Stack, Chip } from '@mui/material';

export interface Attendee {
    username: string;
    displayName: string;
    image?: string;
    isHost?: boolean;
    following?: boolean;
}

interface Props {
    attendees: Attendee[];
    hostName: string;
}

export default function ActivityDetailSidebar({ attendees, hostName }: Props) {
    const attendeesCount = attendees.length;

    return (
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {/* Sidebar Header */}
            <Box
                sx={{
                    py: 2,
                    px: 3,
                    background: 'linear-gradient(135deg, #182a73, #218aae)',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {attendeesCount} {attendeesCount === 1 ? 'Person' : 'People'} Going
                </Typography>
            </Box>

            {/* Attendees List */}
            <Stack sx={{ p: 2 }} spacing={1.5}>
                {attendees.map((attendee) => {
                    const isHost = attendee.displayName === hostName || attendee.isHost;

                    return (
                        <Box
                            key={attendee.username}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1,
                                borderRadius: 2,
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={attendee.image}
                                    alt={attendee.displayName}
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        border: isHost ? '2px solid #f97316' : '2px solid transparent',
                                    }}
                                />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        color: attendee.displayName === 'You' ? 'primary.main' : 'text.primary',
                                    }}
                                >
                                    {attendee.displayName}
                                </Typography>
                                {attendee.following && attendee.displayName !== 'You' && (
                                    <Typography variant="caption" sx={{ color: 'success.main', display: 'block', fontWeight: 600 }}>
                                        Following
                                    </Typography>
                                )}
                            </Box>
                            {isHost && (
                                <Chip
                                    label="Host"
                                    size="small"
                                    sx={{
                                        bgcolor: '#f9731618',
                                        color: '#f97316',
                                        fontWeight: 700,
                                        fontSize: '0.65rem',
                                        height: 20,
                                        border: '1px solid #f9731640',
                                    }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Stack>
        </Card>
    );
}
