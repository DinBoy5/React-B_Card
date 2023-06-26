import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { Container } from '@mui/material';

function Favorite() {
    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Favorite Cards" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2} paddingBottom={3}>
                    {/* Favorite Cards */}
                </Stack>
            </Box>
        </Container>
    );
}

export default Favorite;