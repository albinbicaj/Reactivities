import { Group } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router'
import MenuItemLink from '../shared/components/MenuItemLink'

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, #218aae 69%,#20a7ac 89%)' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <MenuItemLink to='/' sx={{ display: 'flex', gap: 3 }}>
                                <Group fontSize='large' />
                                <Typography variant="h6">Reactivities</Typography>
                            </MenuItemLink>
                        </Box>
                        <Box display='flex'>
                            <MenuItemLink to='/activities' sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/about' sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                About
                            </MenuItemLink>
                            <MenuItemLink to='/contact' sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Contact
                            </MenuItemLink>
                        </Box>
                        <Button
                            component={NavLink}
                            to='/createActivity'
                            size='large'
                            variant='contained'
                            color='warning'
                        >Create activity</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
