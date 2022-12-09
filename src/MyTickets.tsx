/**
 * Purchased Tickets Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Material UI
import { Box, Button, Typography } from '@mui/material';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Types
import { getPurchasesByUserEmail, Purchase } from './globalTypes/data/Purchase';
import { Game, getGameById } from './globalTypes/data/Game';
// Styles
import contentStyle from './globalStyles/contentStyle';
import MyTicketsStyle from './MyTicketsStyle';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MyTicketCard from './components/MyTicketCard/MyTicketCard';
import Loading from './components/Loading/Loading';

type DisplayObj = {
  order: number;
  purchase: Purchase;
  game: Game;
};

/**
 * React functional component for MyTickets
 *
 * @return {React.ReactElement} Renders My Tickets
 */
function MyTickets(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();

  // State
  const loginContext = useLoginContext();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [displayingObj, setDisplayingObj] = React.useState<DisplayObj[]>([]);
  const [needRefresh, setNeedRefresh] = React.useState<boolean>(true);
  // Refs
  const containerRef = React.useRef(null);

  // Function to generate displaying data
  const getData = React.useCallback(async (): Promise<DisplayObj[]> => {
    // Get purchases
    const purchases = await getPurchasesByUserEmail(
      loginContext.firebaseApp,
      loginContext.email as string
    );

    // Generate Displaying Objects
    const displayingObj: DisplayObj[] = [];
    for (const purchase of purchases) {
      // Get Game Information
      const game = await getGameById(loginContext.firebaseApp, purchase.gameId);
      if (game !== undefined) {
        const gameDate = parseInt(
          `${game.year}${game.month.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}${game.day.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}`
        );

        const target = {
          order: gameDate,
          purchase: purchase,
          game: game,
        };

        // sorting
        let idx = 0;
        while (idx < displayingObj.length) {
          if (displayingObj[idx].order > target.order) {
            displayingObj.splice(idx, 0, target);
            break;
          }
          idx++;
        }
        if (idx === displayingObj.length) {
          displayingObj.push(target);
        }
        break;
      }
    }
    return displayingObj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Displaying data if needed
  React.useEffect(() => {
    if (needRefresh) {
      getData().then((data) => {
        setDisplayingObj(data);
        setLoading(false);
        setNeedRefresh(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRefresh]);

  // Function to direct user to previous location
  const goBack = React.useCallback((): void => {
    const prevLocation = (state as { prevLocation: string })?.prevLocation;
    if (prevLocation) {
      navigate(prevLocation);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check whether user is signed in or not
  // Only allow for signed in user
  React.useEffect(() => {
    if (!loginContext.login) {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to move to the game list page
  const gameList = React.useCallback((): void => {
    navigate('/games');
  }, [navigate]);

  // Function to reload data
  const reloadData = React.useCallback((): void => {
    setLoading(true);
    setNeedRefresh(true);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header />
          <Box sx={contentStyle.ContentWrapper}>
            <Box sx={contentStyle.Content} ref={containerRef}>
              <Typography
                variant="h3"
                align="center"
                sx={contentStyle.PageTitle}
              >
                Purchased Tickets
              </Typography>
              {displayingObj.length !== 0 ? (
                displayingObj.map((value) => {
                  return (
                    <MyTicketCard
                      key={value.purchase.id}
                      navigate={navigate}
                      value={value}
                      containerRef={containerRef}
                      reloadData={reloadData}
                    />
                  );
                })
              ) : (
                <Box sx={MyTicketsStyle.NoTicketContentWrapper}>
                  <Box sx={MyTicketsStyle.NoTicketMsgWrapper}>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={MyTicketsStyle.NoTicketMsg}
                    >
                      You have not purchased any tickets!!
                    </Typography>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={MyTicketsStyle.NoTicketMsg}
                    >
                      Check out the game tickets now!!
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={gameList}
                    sx={MyTicketsStyle.CheckoutBtn}
                  >
                    Explore Tickets
                  </Button>
                </Box>
              )}
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

export default MyTickets;
