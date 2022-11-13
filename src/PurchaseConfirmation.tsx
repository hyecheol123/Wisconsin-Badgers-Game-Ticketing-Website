/**
 * Purchase Confirmation Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// Material UI
import { Box, Button, Typography } from '@mui/material';
// Types
import Purchase from './globalTypes/data/Purchase';
import Game from './globalTypes/data/Game';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import PurchaseConfirmationStyle from './PurchaseConfirmationStyle';

// Demo data
import defaultLoginUser from './demoData/loginUser';
import games from './demoData/games';
import defaultPurchases from './demoData/purchases';

/**
 * React functional compnent for Purchase Confirmation page
 *
 * @return {React.ReactElement} Renders Purchase Confirmation page
 */
function PurchaseConfirmation(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();
  // Retrieve gameId from the path
  const { purchaseid } = useParams();

  // State
  const loginContext = useLoginContext();
  const [purchase, setPurchase] = React.useState<Purchase | undefined>(
    undefined
  );
  const [game, setGame] = React.useState<Game | undefined>(undefined);

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

  // Function to direct user to home page
  const goHome = React.useCallback((): void => {
    navigate('/');
  }, [navigate]);

  // Function to direct user to my ticket page
  const goMyTickets = React.useCallback((): void => {
    navigate('/tickets');
  }, [navigate]);

  // Check whether user is signed in or not
  // Only allow for signed in user
  React.useEffect(() => {
    // TODO: Check for referrer
    if (!loginContext.login) {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Retrieve Data
  // Get purchases (demo data)
  const newPurchasesString = sessionStorage.getItem('purchases');
  const newPurchases =
    newPurchasesString !== null ? JSON.parse(newPurchasesString) : [];
  const purchases = [...defaultPurchases, ...newPurchases];
  // Retrieve user (demo data)
  const newUsersString = sessionStorage.getItem('users');
  const newUsers = newUsersString !== null ? JSON.parse(newUsersString) : [];
  const users = [...defaultLoginUser, ...newUsers];
  let loginUser;
  for (const user of users) {
    if (user.email === loginContext.email) {
      loginUser = user;
      break;
    }
  }

  if (purchase === undefined) {
    for (const tempPurchase of purchases) {
      // when we find the purchase with matching id
      if (tempPurchase.id === purchaseid) {
        setPurchase(tempPurchase);
      }
    }
  }
  if (
    purchase !== undefined &&
    game === undefined &&
    purchase.userEmail === loginUser.email
  ) {
    for (const tempGame of games) {
      // when we find the game information for the purchase
      if (tempGame.id === purchase.gameId) {
        setGame(tempGame);
      }
    }
  }
  let gameDateString = '';
  if (game !== undefined) {
    const gameDate = new Date(game.year, game.month - 1, game.day);
    gameDateString = gameDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        {purchase === undefined && <ErrorPage errorCode={404} />}
        {purchase !== undefined && game === undefined && (
          <ErrorPage errorCode={403} />
        )}
        {purchase !== undefined && game !== undefined && (
          <Box sx={contentStyle.Content}>
            <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
              Thanks for Purchase
            </Typography>
            <Box sx={PurchaseConfirmationStyle.SubtitleWrapper}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {`Confirmation No: ${purchaseid}`}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {`Customer Name: ${loginUser.name}`}
              </Typography>
            </Box>
            <Typography variant="body1" align="left">
              {`Thanks for purchasing ${
                purchase.tickets.platinum +
                purchase.tickets.gold +
                purchase.tickets.silver +
                purchase.tickets.bronze
              } tickets for `}
              <strong>{gameDateString}</strong> game with{' '}
              <strong>{game.opponent}</strong>. The tickets will be listed
              below. You need the confirmation number to retrieve your ticket at
              the stadium. You can access to your ticket and request refund on
              "My Tickets" page.
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">{`Platinum Ticket: ${purchase.tickets.platinum}`}</Typography>
              </li>
              <li>
                <Typography variant="body1">{`Gold Ticket: ${purchase.tickets.gold}`}</Typography>
              </li>
              <li>
                <Typography variant="body1">{`Silver Ticket: ${purchase.tickets.silver}`}</Typography>
              </li>
              <li>
                <Typography variant="body1">{`Bronze Ticket: ${purchase.tickets.bronze}`}</Typography>
              </li>
            </ul>
            <Box sx={PurchaseConfirmationStyle.ButtonWrapper}>
              <Button
                color="primary"
                variant="contained"
                sx={PurchaseConfirmationStyle.ButtonMargin}
                onClick={goMyTickets}
              >
                Go to My Tickets
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={PurchaseConfirmationStyle.ButtonMargin}
                onClick={goHome}
              >
                Return to Home
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default PurchaseConfirmation;
