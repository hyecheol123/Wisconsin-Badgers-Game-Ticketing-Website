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
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RefundModal from './components/RefundModal/RefundModal';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Styles
import contentStyle from './globalStyles/contentStyle';
import cardStyle from './globalStyles/cardStyle';

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
          {new Array(6).fill(0).map((_value, index) => {
            return (
              <Card key={index} sx={{ ...cardStyle.Card, cursor: 'auto' }}>
                <Box sx={cardStyle.ImageBox}>
                  <CardMedia
                    component="img"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/350px-Wisconsin_Badgers_logo.svg.png"
                    alt="Wisconsin Badgers Logo"
                  />
                </Box>
                <CardContent sx={cardStyle.InfoBox}>
                  <Typography variant="h5" component="div" noWrap>
                    vs Opponent Team
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Nov. 11. 2022 | Confirmation: 1234
                  </Typography>
                  <Typography variant="body1">Platinum Ticket: 2</Typography>
                  <Typography variant="body1">Gold Ticket: 1</Typography>
                  <Typography variant="body1">Silver Ticket: 1</Typography>
                  <Typography variant="body1" sx={cardStyle.GrowText}>
                    Bronze Ticket: 2
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
