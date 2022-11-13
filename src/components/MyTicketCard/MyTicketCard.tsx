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
// Components
const RefundModal = React.lazy(() => import('../RefundModal/RefundModal'));

// Type to define props for MyTicketCard
type MyTicketCardProps = {
  navigate: (toAddr: string) => void;
  value: {
    order: number;
    game: Game;
    purchase: Purchase;
  };
  containerRef: React.MutableRefObject<null>;
};

/**
 * Function to generate card representing each purchase
 *
 * @param {MyTicketCardProps} props Properties for this component
 * @return {React.ReactElement} React Element for card representing purchase
 */
function MyTicketCard(props: MyTicketCardProps): React.ReactElement {
  const { navigate, value, containerRef } = props;
  // States
  const [maxTypographyWidth, setMaxTypographyWidth] =
    React.useState<number>(797);
  const [finishRender, setFinishRender] = React.useState<boolean>(false);
  const [refundModalOpen, setRefundModalOpen] = React.useState<boolean>(false);
  // Refs
  const cardImgRef = React.useRef(null);
  const cardContentRef = React.useRef(null);

  // Function to update element widths to truncate texts accordingly
  const updateMaxTypographyWidth = React.useCallback((): void => {
    // When no ref set, do nothing
    if (
      !cardImgRef.current ||
      !containerRef.current ||
      !cardContentRef.current
    ) {
      return;
    }

    // Retrieve Width
    const containerComputedStyle = window.getComputedStyle(
      containerRef.current
    );
    const cardImgComputedStyle = window.getComputedStyle(cardImgRef.current);
    const cardContentComputedStyle = window.getComputedStyle(
      cardContentRef.current
    );
    setMaxTypographyWidth(
      (containerRef.current as { clientWidth: number }).clientWidth -
        parseFloat(containerComputedStyle.getPropertyValue('padding-left')) -
        parseFloat(containerComputedStyle.getPropertyValue('padding-right')) -
        (cardImgRef.current as { clientWidth: number }).clientWidth -
        parseFloat(cardImgComputedStyle.getPropertyValue('margin-right')) -
        parseFloat(cardContentComputedStyle.getPropertyValue('padding-left')) -
        parseFloat(cardContentComputedStyle.getPropertyValue('padding-right'))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add event listener to get element size on resize
  React.useEffect(() => {
    // Mount eventListener
    window.addEventListener('resize', updateMaxTypographyWidth);

    // Remove eventListener when component unmounts
    return (): void => {
      window.removeEventListener('resize', updateMaxTypographyWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update cards when parameter changes
  React.useEffect(() => {
    updateMaxTypographyWidth();

    // Re-render box when the max typography width changes
    if (!finishRender) {
      setFinishRender(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishRender]);

  // Function to open/close refund modal
  const openRefundModal = React.useCallback((): void => {
    setRefundModalOpen(true);
  }, []);
  const closeRefundModal = React.useCallback((): void => {
    setRefundModalOpen(false);
  }, []);

  // EventHandler to reroute user to purchase confirmation when
  //   purchase card is clicked
  const onClickCard: React.MouseEventHandler = React.useCallback((): void => {
    navigate(`/confirm/${value.purchase.id}`);
  }, [navigate, value]);
  // EventHandler to open refund modal when button clicked
  const onClickButton: React.MouseEventHandler = React.useCallback(
    (event: React.MouseEvent): void => {
      openRefundModal();
      event.stopPropagation();
    },
    [openRefundModal]
  );

  return (
    <>
      <Card sx={{ ...cardStyle.Card, cursor: 'pointer' }} onClick={onClickCard}>
        <Box sx={cardStyle.ImageBox} ref={cardImgRef}>
          <CardMedia
            component="img"
            image={value.game.opponentImgUrl}
            alt={value.game.opponent}
          />
        </Box>
        <CardContent sx={cardStyle.InfoBox} ref={cardContentRef}>
          <Typography
            variant="h5"
            component="div"
            noWrap
            sx={{ maxWidth: `${maxTypographyWidth}px` }}
          >
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
            sx={{ maxWidth: `${maxTypographyWidth}px` }}
          >
            {`Confirmation: ${value.purchase.id}`}
          </Typography>
          <Typography variant="body1">
            {`Platinum Ticket: ${value.purchase.tickets.platinum}`}
          </Typography>
          <Typography variant="body1">
            {`Gold Ticket: ${value.purchase.tickets.gold}`}
          </Typography>
          <Typography variant="body1">
            {`Silver Ticket: ${value.purchase.tickets.silver}`}
          </Typography>
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
      {refundModalOpen && (
        <RefundModal
          isOpen={refundModalOpen}
          handleClose={closeRefundModal}
          game={value.game}
          purchase={value.purchase}
        />
      )}
    </>
  );
}

export default MyTicketCard;
