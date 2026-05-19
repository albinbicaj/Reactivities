import { MenuItem, type MenuItemProps } from "@mui/material";
import { NavLink } from "react-router";

interface Props extends MenuItemProps {
    to: string;
}

export default function MenuItemLink({ to, children, sx, ...props }: Props) {
    return (
        <MenuItem 
            component={NavLink} 
            to={to}
            {...props}
            sx={{
                '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'yellow',
                    fontWeight: 'bold',
                    borderRadius: '4px'
                },
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                transition: 'all 0.3s ease',
                ...sx
            }}
        >
            {children}
        </MenuItem>
    )
}