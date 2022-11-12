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
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import cardStyle from './globalStyles/cardStyle';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Demo Data
import games from './demoData/games';
import defaultPurchases from './demoData/purchases';
const RefundModal = React.lazy(
  () => import('./components/RefundModal/RefundModal')
);

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
  const [refundModalOpen, setRefundModalOpen] = React.useState<boolean>(false);

  // Get purchases (demo data)
  const newPurchasesString = sessionStorage.getItem('purchases');
  const newPurchases =
    newPurchasesString !== null ? JSON.parse(newPurchasesString) : [];
  const purchases = [...defaultPurchases, ...newPurchases];

  const displayingObj = [];
  for (let purchase of purchases) {
    if (purchase.userEmail === loginContext.email) {
      for (let game of games) {
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
          if(idx === displayingObj.length) {
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

  // Function to open/close refund modal
  const openRefundModal = React.useCallback((): void => {
    setRefundModalOpen(true);
  }, []);
  const closeRefundModal = React.useCallback((): void => {
    setRefundModalOpen(false);
  }, []);

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
            Purchased Tickets
          </Typography>
          {displayingObj.map((value) => {
            return (
              <Card
                key={value.purchase.id}
                sx={{ ...cardStyle.Card, cursor: 'auto' }}
              >
                <Box sx={cardStyle.ImageBox}>
                  <CardMedia
                    component="img"
                    image={value.game.opponentImgUrl}
                    alt={value.game.opponent}
                  />
                </Box>
                <CardContent sx={cardStyle.InfoBox}>
                  <Typography variant="h5" component="div" noWrap>
                    {`vs ${value.game.opponent}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {`${new Date(
                      value.game.year,
                      value.game.month - 1,
                      value.game.day
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    noWrap
                  >
                    {`Confirmation: ${value.purchase.id}`}
                  </Typography>
                  <Typography variant="body1">{`Platinum Ticket: ${value.purchase.tickets.platinum}`}</Typography>
                  <Typography variant="body1">{`Gold Ticket: ${value.purchase.tickets.gold}`}</Typography>
                  <Typography variant="body1">{`Silver Ticket: ${value.purchase.tickets.silver}`}</Typography>
                  <Typography variant="body1" sx={cardStyle.GrowText}>
                    {`Bronze Ticket: ${value.purchase.tickets.bronze}`}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={cardStyle.Button}
                    onClick={openRefundModal}
                  >
                    Request Refund
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
        {refundModalOpen && (
          <RefundModal
            isOpen={refundModalOpen}
            handleClose={closeRefundModal}
          />
        )}
      </Box>
      <Footer />
    </>
  );
}

export default MyTickets;
