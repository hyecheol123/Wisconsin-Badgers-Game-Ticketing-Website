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
import { getPurchaseByPurchaseId, Purchase } from './globalTypes/data/Purchase';
import { Game, getGameById } from './globalTypes/data/Game';
import { getUserByEmail, User } from './globalTypes/data/User';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import PurchaseConfirmationStyle from './PurchaseConfirmationStyle';
import Loading from './components/Loading/Loading';

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
  const [loading, setLoading] = React.useState<boolean>(true);
  const [unauthorized, setUnauthroized] = React.useState<boolean>(false);
  const [notFound, setNotFound] = React.useState<boolean>(false);
  const [loginUser, setLoginUser] = React.useState<User | undefined>();
  const [purchase, setPurchase] = React.useState<Purchase | undefined>();
  const [game, setGame] = React.useState<Game>();
  const [gameDateString, setGameDateString] = React.useState<string>('');

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
    if (!loginContext.login) {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Retrieve Data
  React.useEffect(() => {
    // Get User Information
    getUserByEmail(loginContext.firebaseApp, loginContext.email as string).then(
      (userInfo) => {
        if (userInfo === undefined) {
          setUnauthroized(true);
          setLoading(false);
        } else {
          setLoginUser(userInfo);
          // Get Purchase Information
          getPurchaseByPurchaseId(
            loginContext.firebaseApp,
            purchaseid as string
          ).then((purchaseInfo) => {
            if (purchaseInfo === undefined) {
              setNotFound(true);
              setLoading(false);
            } else if (purchaseInfo.userEmail !== userInfo.email) {
              setUnauthroized(true);
              setLoading(false);
            } else {
              setPurchase(purchaseInfo);
              // Get Game Information
              getGameById(loginContext.firebaseApp, purchaseInfo.gameId).then(
                (gameInfo) => {
                  if (gameInfo === undefined) {
                    setUnauthroized(true);
                    setLoading(false);
                  } else {
                    setGame(gameInfo);
                    const gameDate = new Date(
                      gameInfo.year,
                      gameInfo.month - 1,
                      gameInfo.day
                    );
                    setGameDateString(
                      gameDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    );
                    setLoading(false);
                  }
                }
              );
            }
          });
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseid]);

  return (
    <>
      {!loading ? (
        <>
          <Header />
          <Box sx={contentStyle.ContentWrapper}>
            {unauthorized && <ErrorPage errorCode={403} />}
            {notFound && <ErrorPage errorCode={404} />}
            {!unauthorized && !notFound && purchase && game && loginUser && (
              <Box sx={contentStyle.Content}>
                <Typography
                  variant="h3"
                  align="center"
                  sx={contentStyle.PageTitle}
                >
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
                  below. You need the confirmation number to retrieve your
                  ticket at the stadium. You can access to your ticket and
                  request refund on "My Tickets" page.
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
      ) : (
        <Loading />
      )}
    </>
  );
}

export default PurchaseConfirmation;
