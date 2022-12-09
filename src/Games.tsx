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
// Global Types
import { Game, getGamesList } from './globalTypes/data/Game';
// Custom Hook to load LoginContext
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import cardStyle from './globalStyles/cardStyle';
import Loading from './components/Loading/Loading';

/**
 * React functional component for Game List
 *
 * @return {React.ReactElement} Renders Game Lists
 */
function Games(): React.ReactElement {
  // React Router
  const navigate = useNavigate();
  // States
  const loginContext = useLoginContext();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [games, setGames] = React.useState<Game[]>([]);

  // Function to move to the game detail page
  const gameDetail = React.useCallback(
    (gameId: string): void => {
      navigate(`/games/${gameId}`);
    },
    [navigate]
  );

  // Get Game Data
  React.useEffect(() => {
    getGamesList(loginContext.firebaseApp).then((gamesList) => {
      setGames(gamesList);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header />
          <Box sx={contentStyle.ContentWrapper}>
            <Box sx={contentStyle.Content}>
              <Typography
                variant="h3"
                align="center"
                sx={contentStyle.PageTitle}
              >
                Game Lists (2023)
              </Typography>
              <Typography variant="body1" align="left">
                This is the full list of this season's home game. Click the game
                to see more detail and to purchase the tickets.
              </Typography>
              {games.map((value) => {
                const gameDate = new Date(
                  value.year,
                  value.month - 1,
                  value.day
                );

                return (
                  <Card
                    key={value.id}
                    sx={cardStyle.Card}
                    onClick={(): void => {
                      gameDetail(value.id);
                    }}
                  >
                    <Box sx={cardStyle.ImageBox}>
                      <CardMedia
                        component="img"
                        image={value.opponentImgUrl}
                        alt={`${value.opponent} Logo`}
                      />
                    </Box>
                    <CardContent sx={cardStyle.InfoBox}>
                      <Typography variant="h5" component="div" noWrap>
                        {`vs ${value.opponent}`}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={cardStyle.GrowText}
                      >
                        {gameDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="body1">{`Remaining Seats: ${
                        value.ticketCount.platinum +
                        value.ticketCount.gold +
                        value.ticketCount.silver +
                        value.ticketCount.bronze
                      }`}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Games;
