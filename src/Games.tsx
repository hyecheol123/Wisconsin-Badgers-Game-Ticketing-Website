/**
 * Game List Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Material UI
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Styles
import contentStyle from './globalStyles/contentStyle';
import GamesStyle from './GamesStyle';

/**
 * React functional component for Game List
 *
 * @return {React.ReactElement} Renders Game Lists
 */
function Games(): React.ReactElement {
  // React Router
  const navigate = useNavigate();

  // Function to move to the game detail page
  const gameDetail = React.useCallback(
    (gameId: number): void => {
      navigate(`/games/${gameId}`);
    },
    [navigate]
  );

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
            Game Lists (2022)
          </Typography>
          <Typography variant="body1" align="left">
            This is the full list of this season's home game. Click the game to
            see more detail and to purchase the tickets.
          </Typography>
          {new Array(6).fill(0).map((_value, index) => {
            return (
              <Card
                key={`${index}`}
                sx={GamesStyle.GameCard}
                onClick={(): void => {
                  gameDetail(index);
                }}
              >
                <Box sx={GamesStyle.ImageBox}>
                  <CardMedia
                    component="img"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/350px-Wisconsin_Badgers_logo.svg.png"
                    alt="Wisconsin Badgers Logo"
                  />
                </Box>
                <CardContent sx={GamesStyle.InfoBox}>
                  <Typography variant="h5" component="div">
                    vs Opponent Team
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={GamesStyle.DateText}
                  >
                    Nov. 11 2022
                  </Typography>
                  <Typography variant="body1">Remaining Seats: xxx</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Games;
