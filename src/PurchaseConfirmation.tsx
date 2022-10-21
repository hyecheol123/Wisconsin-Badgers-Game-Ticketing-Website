/**
 * Purchase Confirmation Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Material UI
import { Box, Button, Typography } from '@mui/material';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import PurchaseConfirmationStyle from './PurchaseConfirmationStyle';

/**
 * React functional compnent for Purchase Confirmation page
 *
 * @return {React.ReactElement} Renders Purchase Confirmation page
 */
function PurchaseConfirmation(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();

  // State
  const loginContext = useLoginContext();

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

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
            Thanks for Purchase
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={PurchaseConfirmationStyle.Subtitle}
          >
            Confirmation No: 1234
          </Typography>
          <Typography variant="body1" align="left">
            Thanks for purchasing 6 tickets for <strong>Nov. 11. 2022</strong>{' '}
            game with <strong>Opponent Team</strong>. The tickets will be listed
            below. You need the confirmation number to retrieve your ticket at
            the stadium. You can access to your ticket and request refund on "My
            Tickets" page.
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Platinum Ticket: 2</Typography>
            </li>
            <li>
              <Typography variant="body1">Gold Ticket: 1</Typography>
            </li>
            <li>
              <Typography variant="body1">Silver Ticket: 1</Typography>
            </li>
            <li>
              <Typography variant="body1">Bronze Ticket: 2</Typography>
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
      </Box>
      <Footer />
    </>
  );
}

export default PurchaseConfirmation;
