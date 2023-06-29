import { Typography, Box, Stack, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { FooterLink } from './FooterLink'
import { getData } from '../utils/localStorage';
import { useState } from 'react';

export default function Footer() {
    const [icons, setIcons] = useState({ user: false, admin: false })
    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={9}>
                    <FooterLink to="/about" icon={<InfoIcon color="action" />} text="About" />
                    {getData('user', 'token') &&
                        <FooterLink to="/favorite" icon={<FavoriteIcon color="action" />} text="Favorite" />
                    }
                    {getData('user', 'business') &&
                        <FooterLink to="/my cards" icon={<RecentActorsIcon color="action" />} text="My Cards" />
                    }
                </Stack>
            </Box>
        </Paper>
    );
}


