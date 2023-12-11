import {useContext} from 'react';
import {Card, CardContent, Typography, useMediaQuery} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
import {ThemeContext} from '../context/Theme';

export default function Video() {
  const color = blueGrey[50];
  const isMdScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {themeMode} = useContext(ThemeContext);
  const backgroundColor = {backgroundColor: themeMode === 'light' ? color : ''};

  return (
    <Card sx={{textAlign: 'center', paddingY: '20px', backgroundColor: backgroundColor, cursor: 'pointer'}}>
      <CardContent className="video">
        <Typography gutterBottom variant="h2" component="h2">
          How to use the app
        </Typography>
      </CardContent>
      <video style={{width: isMdScreen ? '640px' : '95%'}} controls>
        <source src="https://github.com/Din-BL/React-B_Card/assets/93730629/3b0f0f43-1b03-408a-b1ea-ccb04a91cbb6" type="video/mp4" />
        Your browser does not support the video tag
      </video>
    </Card>
  );
}
