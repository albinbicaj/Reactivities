import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailSidebar, { type Attendee } from './ActivityDetailSidebar';

const mockAttendeesPool = [

    { username: 'bob', displayName: 'Bob Smith', image: 'https://mui.com/static/images/avatar/1.jpg', following: true },
    { username: 'alice', displayName: 'Alice Jones', image: 'https://mui.com/static/images/avatar/2.jpg', following: false },
    { username: 'charlie', displayName: 'Charlie Brown', image: 'https://mui.com/static/images/avatar/3.jpg', following: true },
    { username: 'emily', displayName: 'Emily Watson', image: 'https://mui.com/static/images/avatar/4.jpg', following: false },
    { username: 'tom', displayName: 'Tom Hanks', image: 'https://mui.com/static/images/avatar/5.jpg', following: false },
    { username: 'sarah', displayName: 'Sarah Jenkins', image: 'https://mui.com/static/images/avatar/6.jpg', following: true },
    { username: 'david', displayName: 'David Beckham', image: 'https://mui.com/static/images/avatar/7.jpg', following: false },
];

export default function ActivityDetail() {
    const { id } = useParams();
    const { activity, isPendingActivity } = useActivities(id);

    const [isGoing, setIsGoing] = useState<boolean>(false);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [hostName, setHostName] = useState<string>('Bob Smith');

    // Initialize state when activity is loaded
    useEffect(() => {
        if (!id) return;

        // Load Join/Leave state from localStorage
        const storedIsGoing = localStorage.getItem(`isGoing_${id}`) === 'true';
        setIsGoing(storedIsGoing);

        // Generate mock host and attendees deterministically based on activity ID
        const hostIdx = id.charCodeAt(0) % mockAttendeesPool.length;
        const host = { ...mockAttendeesPool[hostIdx], isHost: true };
        setHostName(host.displayName);

        const others = mockAttendeesPool.filter((_, idx) => idx !== hostIdx);
        const numAttendees = 2 + (id.charCodeAt(id.length - 1) % 3); // 2, 3, or 4 others
        const selectedOthers: Attendee[] = [];

        for (let i = 0; i < numAttendees; i++) {
            const idx = (id.charCodeAt(i % id.length) + i) % others.length;
            const person = others[idx];
            if (!selectedOthers.find(p => p.username === person.username)) {
                selectedOthers.push(person);
            }
        }

        const baseAttendees = [host, ...selectedOthers];
        
        if (storedIsGoing) {
            // Append 'You' to the attendees list if you are going
            const youAttendee: Attendee = {
                username: 'current_user',
                displayName: 'You',
                image: 'https://mui.com/static/images/avatar/2.jpg',
                isHost: false,
            };
            setAttendees([...baseAttendees, youAttendee]);
        } else {
            setAttendees(baseAttendees);
        }
    }, [id]);

    const handleJoinLeave = () => {
        if (!id) return;

        const newVal = !isGoing;
        setIsGoing(newVal);
        localStorage.setItem(`isGoing_${id}`, String(newVal));

        if (newVal) {
            // Add 'You' to the list
            const youAttendee: Attendee = {
                username: 'current_user',
                displayName: 'You',
                image: 'https://mui.com/static/images/avatar/2.jpg',
                isHost: false,
            };
            setAttendees(prev => [...prev, youAttendee]);
        } else {
            // Remove 'You' from the list
            setAttendees(prev => prev.filter(a => a.username !== 'current_user'));
        }
    };

    if (isPendingActivity) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Typography variant="h6">Loading activity...</Typography>
            </Box>
        );
    }

    if (!activity) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Typography variant="h6" color="error">Activity not found</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {/* Left Column: Header, Info, Chat */}
            <Grid size={{ xs: 12, md: 8 }}>
                <ActivityDetailHeader
                    activity={activity}
                    isGoing={isGoing}
                    onJoinLeave={handleJoinLeave}
                    isHost={false}
                    hostName={hostName}
                />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat activityId={activity.id} />
            </Grid>

            {/* Right Column: Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
                <ActivityDetailSidebar attendees={attendees} hostName={hostName} />
            </Grid>
        </Grid>
    );
}
