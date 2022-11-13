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
// Styles
import contentStyle from './globalStyles/contentStyle';
import MyTicketsStyle from './MyTicketsStyle';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MyTicketCard from './components/MyTicketCard/MyTicketCard';

// Demo Data
import games from './demoData/games';
import defaultPurchases from './demoData/purchases';

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
  // Refs
  const containerRef = React.useRef(null);

  // Get purchases (demo data)
  const newPurchasesString = sessionStorage.getItem('purchases');
  const newPurchases =
    newPurchasesString !== null ? JSON.parse(newPurchasesString) : [];
  const purchases = [...defaultPurchases, ...newPurchases];

  const displayingObj = [];
  for (const purchase of purchases) {
    if (purchase.isValid && purchase.userEmail === loginContext.email) {
      for (const game of games) {
        if (game.id === purchase.gameId) {
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
    }
  }

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

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content} ref={containerRef}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
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
  );
}

export default MyTickets;
