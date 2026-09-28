import { Box, Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issues with Vite/React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
    position?: [number, number];
    venue?: string;
    city?: string;
    height?: number | string;
}

export default function MapComponent({ position, venue, city, height = 300 }: Props) {
    if (!position || (position[0] === 0 && position[1] === 0)) {
        return (
            <Paper
                sx={{
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    bgcolor: 'grey.100',
                    border: '1px dashed grey.400',
                }}
            >
                <Typography color="text.secondary">
                    No map location available for this activity
                </Typography>
            </Paper>
        );
    }

    return (
        <Box
            sx={{
                height: height,
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                '& .leaflet-container': {
                    height: '100%',
                    width: '100%',
                    borderRadius: '12px',
                },
            }}
        >
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <Typography variant="subtitle2" fontWeight={700}>
                            {venue || 'Event Location'}
                        </Typography>
                        {city && (
                            <Typography variant="caption" color="text.secondary" display="block">
                                {city}
                            </Typography>
                        )}
                    </Popup>
                </Marker>
            </MapContainer>
        </Box>
    );
}
