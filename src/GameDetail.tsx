/**
 * Game Detail Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// Material UI
import {
  Alert,
  Box,
  Button,
  Divider,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
// Global Style
import Error from './globalTypes/FormError';
// Component
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import GameDetailStyle from './GameDetailStyle';
import formBoxStyleProvider from './globalStyles/formBoxStyleProvider';
import formStyle from './globalStyles/formStyle';

// Demo data
import games from './demoData/games';
import defaultPurchases from './demoData/purchases';
const PurchaseModal = React.lazy(
  () => import('./components/PurchaseModal/PurchaseModal')
);

/**
 * React functional component for Game Detail Page
 *
 * @return {React.ReactElement} Renders Game Detail page
 */
function GameDetail(): React.ReactElement {
  // React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Retrieve gameId from the path
  const { gameid } = useParams();

  // Get purchases (demo data)
  const newPurchasesString = sessionStorage.getItem('purchases');
  const newPurchases =
    newPurchasesString !== null ? JSON.parse(newPurchasesString) : [];
  const purchases = [...defaultPurchases, ...newPurchases];

  // Generate style for the form box
  const theme = useTheme();

  // States
  const loginContext = useLoginContext();
  const [platinumTicketCnt, setPlatinumTicketCnt] = React.useState<number>(0);
  const [goldTicketCnt, setGoldTicketCnt] = React.useState<number>(0);
  const [silverTicketCnt, setSilverTicketCnt] = React.useState<number>(0);
  const [bronzeTicketCnt, setBronzeTicketCnt] = React.useState<number>(0);
  const [purchaseModalOpen, setPurchaseModalOpen] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>({ error: false, msg: '' });

  // EventHandlers to modify form input
  const onPlatinumTicketCntChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setPlatinumTicketCnt(parseInt(event.target.value));
    },
    []
  );
  const onGoldTicketCntChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setGoldTicketCnt(parseInt(event.target.value));
    },
    []
  );
  const onSilverTicketCntChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSilverTicketCnt(parseInt(event.target.value));
    },
    []
  );
  const onBronzeTicketCntChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setBronzeTicketCnt(parseInt(event.target.value));
    },
    []
  );

  // EventHandler to close alert
  const closeAlert = React.useCallback(() => {
    setError({ error: false, msg: '' });
  }, []);

  // current selected number of tickets
  const currSelected =
    platinumTicketCnt + goldTicketCnt + silverTicketCnt + bronzeTicketCnt;

  // Event Handler for user to continue purchase the ticket
  const openPurchaseModal = React.useCallback((): void => {
    // When user is not logged in, redirect user to the login page
    if (!loginContext.login) {
      navigate('/login', { state: { prevLocation: location.pathname } });
    } else {
      // If there is no seats selected (total number of selected seat is 0),
      // Else if total selected seat is greater than 6,
      // do not open modal and alert user
      if (currSelected < 1) {
        setError({ error: true, msg: 'Should select at least one seat' });
      } else if (currSelected > 6) {
        setError({ error: true, msg: 'Cannot choose more than 6 seats' });
      } else {
        // Open modal if there is no error
        setPurchaseModalOpen(true);
      }
    }
  }, [navigate, location.pathname, loginContext.login, currSelected]);
  const closePurchaseModal = React.useCallback((): void => {
    setPurchaseModalOpen(false);
  }, []);

  // Retrieve game information
  let game;
  for (const item of games) {
    if (item.id === gameid) {
      game = item;
    }
  }
  // Game not found
  if (game === undefined) {
    // 404 Error
    return (
      <>
        <Header />
        <ErrorPage errorCode={404} />
        <Footer />
      </>
    );
  }

  // Calculate the remaining seat for each game tier using purchase history
  const maxSeats = {
    platinum: game.ticketCount.platinum,
    gold: game.ticketCount.gold,
    silver: game.ticketCount.silver,
    bronze: game.ticketCount.bronze,
  };
  for (const purchase of purchases) {
    if (purchase.gameId === game.id) {
      maxSeats.platinum -= purchase.tickets.platinum;
      maxSeats.gold -= purchase.tickets.gold;
      maxSeats.silver -= purchase.tickets.silver;
      maxSeats.bronze -= purchase.tickets.bronze;
    }
  }
  // Maximum ticket for each
  const maxTicketPerPurchase = 6;
  // eslint-disable-next-line guard-for-in
  for (const seatTier in maxSeats) {
    maxSeats[seatTier] = Math.min(maxSeats[seatTier], maxTicketPerPurchase);
  }

  // Date String
  const gameDate = new Date(game.year, game.month - 1, game.day);
  const gameDateString = gameDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  let gameDateStringForDetailPage = gameDateString;
  if (game.hour === undefined) {
    gameDateStringForDetailPage += ' TBD';
  } else {
    gameDateStringForDetailPage += ` ${game.hour}:${game.minute}`;
  }

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
            {`vs ${game.opponent}`}
          </Typography>
          <Typography variant="body1" align="left">
            <strong>Date:</strong> {gameDateStringForDetailPage}
          </Typography>
          <Typography variant="body1" align="left">
            <strong>Stadium:</strong> Camp Randall Stadium
          </Typography>
          <Box sx={GameDetailStyle.TeamWrapper}>
            <Box sx={GameDetailStyle.TeamContent}>
              <Box sx={GameDetailStyle.Team}>
                <img
                  src="https://d1qwqe1acr1rnz.cloudfront.net/images/logos/Wisconsin.png"
                  alt="Wisconsin Badgers"
                  style={GameDetailStyle.TeamImage}
                />
              </Box>
              <Typography variant="h6" align="center">
                Home
              </Typography>
            </Box>
            <Box sx={GameDetailStyle.TeamContent}>
              <Box sx={GameDetailStyle.Team}>
                <img
                  src={game.opponentImgUrl}
                  alt={game.opponent}
                  style={GameDetailStyle.TeamImage}
                />
              </Box>
              <Typography variant="h6" align="center">
                Away
              </Typography>
            </Box>
          </Box>
          <Box sx={formBoxStyleProvider(theme, false)}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                align="center"
                sx={GameDetailStyle.PurchaseFormTitle}
              >
                Purchase Tickets
              </Typography>
              <Typography variant="body1" align="left">
                The ticket grade indicates the distance between the seat and the
                field. The platinum ticket is closest to the field, followed by
                gold, silver, and bronze.
                <br />
                Up to <strong>6 tickets</strong> can be purchased in one
                transaction.
              </Typography>
              <Divider sx={GameDetailStyle.PurchaseDivider} />
              <TextField
                select
                fullWidth
                label={`Platinum Tickets - $${game.ticketPrice.platinum}`}
                value={platinumTicketCnt}
                onChange={onPlatinumTicketCntChange}
                helperText="Please choose the number of platinum tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {[
                  ...Array(
                    Math.max(
                      Math.min(
                        maxTicketPerPurchase - currSelected,
                        maxSeats.platinum
                      ) + 1,
                      platinumTicketCnt + 1
                    )
                  ),
                ].map((_value, index) => (
                  <MenuItem key={`Platinum-${index}`} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label={`Gold Tickets - $${game.ticketPrice.gold}`}
                value={goldTicketCnt}
                onChange={onGoldTicketCntChange}
                helperText="Please choose the number of gold tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {[
                  ...Array(
                    Math.max(
                      Math.min(
                        maxTicketPerPurchase - currSelected,
                        maxSeats.gold
                      ) + 1,
                      goldTicketCnt + 1
                    )
                  ),
                ].map((_value, index) => (
                  <MenuItem key={`Gold-${index}`} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label={`Silver Tickets - $${game.ticketPrice.silver}`}
                value={silverTicketCnt}
                onChange={onSilverTicketCntChange}
                helperText="Please choose the number of silver tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {[
                  ...Array(
                    Math.max(
                      Math.min(
                        maxTicketPerPurchase - currSelected,
                        maxSeats.silver
                      ) + 1,
                      silverTicketCnt + 1
                    )
                  ),
                ].map((_value, index) => (
                  <MenuItem key={`Silver-${index}`} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label={`Bronze Tickets - $${game.ticketPrice.bronze}`}
                value={bronzeTicketCnt}
                onChange={onBronzeTicketCntChange}
                helperText="Please choose the number of bronze tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {[
                  ...Array(
                    Math.max(
                      Math.min(
                        maxTicketPerPurchase - currSelected,
                        maxSeats.bronze
                      ) + 1,
                      bronzeTicketCnt + 1
                    )
                  ),
                ].map((_value, index) => (
                  <MenuItem key={`Bronze-${index}`} value={index}>
                    {index}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={GameDetailStyle.ButtonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={openPurchaseModal}
                  sx={formStyle.Button}
                >
                  Purchase
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={formStyle.Button}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>
          {purchaseModalOpen && (
            <PurchaseModal
              isOpen={purchaseModalOpen}
              handleClose={closePurchaseModal}
              gameId={gameid}
              gameDateString={gameDateString}
              opponentTeam={game.opponent}
              ticketCounts={{
                platinum: platinumTicketCnt,
                gold: goldTicketCnt,
                silver: silverTicketCnt,
                bronze: bronzeTicketCnt,
              }}
              ticketPrice={{
                platinum: game.ticketPrice.platinum,
                gold: game.ticketPrice.gold,
                silver: game.ticketPrice.silver,
                bronze: game.ticketPrice.bronze,
              }}
            />
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        open={error.error}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}

export default GameDetail;
