/**
 * Card representing each purchase on My Ticket Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
// Global Types
import Game from '../../globalTypes/data/Game';
import Purchase from '../../globalTypes/data/Purchase';
// Global Style
import cardStyle from '../../globalStyles/cardStyle';

// Type to define props for MyTicketCard
type MyTicketCardProps = {
  navigate: (toAddr: string) => void;
  value: {
    order: number;
    game: Game;
    purchase: Purchase;
  };
  openRefundModal: () => void;
};

/**
 * Function to generate card representing each purchase
 *
 * @param {MyTicketCardProps} props Properties for this component
 * @return {React.ReactElement} React Element for card representing purchase
 */
function MyTicketCard(props: MyTicketCardProps): React.ReactElement {
  const { navigate, value, openRefundModal } = props;

  // EventHandler to reroute user to purchase confirmation when
  //   purchase card is clicked
  const onClickCard: React.MouseEventHandler = React.useCallback((): void => {
    navigate(`/confirm/${value.purchase.id}`);
  }, []);
  // EventHandler to open refund modal when button clicked
  const onClickButton: React.MouseEventHandler = React.useCallback((event: React.MouseEvent): void => {
    openRefundModal();
    event.stopPropagation();
  }, []);


  return (
    <Card sx={{ ...cardStyle.Card, cursor: 'pointer' }} onClick={onClickCard}>
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
        <Typography variant="subtitle1" color="text.secondary" component="div">
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
          onClick={onClickButton}
        >
          Request Refund
        </Button>
      </CardContent>
    </Card>
  );
}

export default MyTicketCard;
