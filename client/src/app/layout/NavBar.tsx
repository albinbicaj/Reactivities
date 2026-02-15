import { Group } from '@mui/icons-material'
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material'

type Props = {
    openForm: (id?: string) => void
}

export default function NavBar({ openForm }: Props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, #218aae 69%,#20a7ac 89%)' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <MenuItem sx={{ display: 'flex', gap: 3 }}>
                                <Group fontSize='large' />
                                <Typography variant="h6">Reactivities</Typography>
                            </MenuItem>
                        </Box>
                        <Box>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Activities
                            </MenuItem>
                        </Box>
                        <Box>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                About
                            </MenuItem>
                        </Box>
                        <Box>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Contact
                            </MenuItem>
                        </Box>
                        <Button
                            size='large'
                            variant='contained'
                            color='warning'
                            onClick={() => openForm()}
                        >Create activity</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
