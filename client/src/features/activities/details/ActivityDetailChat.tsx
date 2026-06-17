import { useState, useEffect } from 'react';
import { Box, Card, Typography, TextField, Button, Avatar, Stack } from '@mui/material';

interface Comment {
    id: string;
    displayName: string;
    username: string;
    image?: string;
    body: string;
    createdAt: string;
}

interface Props {
    activityId: string;
}

const mockInitialComments: Record<string, Comment[]> = {
    default: [
        {
            id: 'c1',
            displayName: 'Sarah Jenkins',
            username: 'sarah',
            image: 'https://mui.com/static/images/avatar/3.jpg',
            body: 'This looks like an amazing event! Can\'t wait to meet everyone there.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        },
        {
            id: 'c2',
            displayName: 'Matt Damon',
            username: 'matt',
            image: 'https://mui.com/static/images/avatar/1.jpg',
            body: 'I will be arriving about 15 minutes late, save a spot for me!',
            createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
        }
    ]
};

export default function ActivityDetailChat({ activityId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [body, setBody] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem(`comments_${activityId}`);
        if (stored) {
            setComments(JSON.parse(stored));
        } else {
            // Seed default comments if not present
            const seed = mockInitialComments[activityId] || mockInitialComments.default;
            setComments(seed);
            localStorage.setItem(`comments_${activityId}`, JSON.stringify(seed));
        }
    }, [activityId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            displayName: 'You',
            username: 'current_user',
            image: 'https://mui.com/static/images/avatar/2.jpg', // User's avatar
            body: body.trim(),
            createdAt: new Date().toISOString(),
        };

        const updatedComments = [newComment, ...comments]; // Newest first
        setComments(updatedComments);
        localStorage.setItem(`comments_${activityId}`, JSON.stringify(updatedComments));
        setBody('');
    };

    const formatCommentTime = (isoString: string) => {
        const diffMs = Date.now() - new Date(isoString).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        return new Date(isoString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {/* Header */}
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
                    Chat about this activity
                </Typography>
            </Box>

            {/* Comment Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <TextField
                    placeholder="Enter your comment (Enter to submit, Shift + Enter for new line)"
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!body.trim()}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        backgroundImage: 'linear-gradient(135deg, #218aae, #20a7ac)',
                        px: 3,
                        color: 'white',
                        '&:hover': {
                            opacity: 0.9
                        }
                    }}
                >
                    Add Reply
                </Button>
            </Box>

            {/* Comment List */}
            <Box sx={{ p: 3, maxH: 400, overflowY: 'auto' }}>
                {comments.length === 0 ? (
                    <Typography color="text.secondary" align="center">
                        No comments yet. Be the first to reply!
                    </Typography>
                ) : (
                    <Stack spacing={3}>
                        {comments.map((comment) => (
                            <Box key={comment.id} display="flex" gap={2}>
                                <Avatar
                                    src={comment.image}
                                    alt={comment.displayName}
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box display="flex" alignItems="baseline" gap={1}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                            {comment.displayName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatCommentTime(comment.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 0.5,
                                            color: 'text.primary',
                                            lineHeight: 1.5,
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        {comment.body}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>
        </Card>
    );
}
