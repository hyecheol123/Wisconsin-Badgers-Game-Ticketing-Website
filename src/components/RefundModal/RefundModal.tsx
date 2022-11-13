/**
 * Modal which helps users to request refund for the ticket
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
// Style
import modalStyle from '../../globalStyles/modalStyle';
// Types
import Game from '../../globalTypes/data/Game';
import Purchase from '../../globalTypes/data/Purchase';
import Error from '../../globalTypes/FormError';

// Type for the component's props
type RefundModalProps = {
  isOpen: boolean;
  game: Game;
  purchase: Purchase;
  handleClose: () => void;
};

/**
 * React functional component to generate modal which helps user to request refund.
 *
 * @param {RefundModalProps} props Properties that passed from the parent Component.
 * @return {React.ReactElement} Renders Refund Request Modal
 */
function RefundModal(props: RefundModalProps): React.ReactElement {
  const { isOpen, game, purchase, handleClose } = props;

  // State
  const [platinumTicketCnt, setPlatinumTicketCnt] = React.useState<number>(
    purchase.tickets.platinum
  );
  const [goldTicketCnt, setGoldTicketCnt] = React.useState<number>(
    purchase.tickets.gold
  );
  const [silverTicketCnt, setSilverTicketCnt] = React.useState<number>(
    purchase.tickets.silver
  );
  const [bronzeTicketCnt, setBronzeTicketCnt] = React.useState<number>(
    purchase.tickets.bronze
  );
  const [note, setNote] = React.useState<string>('');
  const [acknowledge, setAcknowledge] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>({ error: false, msg: '' });

  // EventHandlers to prevent submit on enter
  const onKeyPress: React.KeyboardEventHandler = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    []
  );

  // EventHandlers to modify form input
  const onAcknowledgeChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setAcknowledge(event.target.checked);
    },
    []
  );
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
  const onNoteChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNote(event.target.value);
    },
    []
  );

  // EventHandler to close alert
  const closeAlert = React.useCallback(() => {
    setError({ error: false, msg: '' });
  }, []);

  // Validity Check
  const validityCheck = React.useCallback((): boolean => {
    // Agree to acknowledgement
    if (!acknowledge) {
      setError({
        error: true,
        msg: 'You have to agree with all terms and conditions',
      });
      return false;
    }

    // Check the number of tickets [0, purchasedTicketNum]
    if (
      platinumTicketCnt < 0 ||
      platinumTicketCnt > purchase.tickets.platinum
    ) {
      setError({
        error: true,
        msg: 'Invalid Number of Platinum Tickets to refund',
      });
      return false;
    }
    if (goldTicketCnt < 0 || goldTicketCnt > purchase.tickets.gold) {
      setError({
        error: true,
        msg: 'Invalid Number of Gold Tickets to refund',
      });
      return false;
    }
    if (silverTicketCnt < 0 || silverTicketCnt > purchase.tickets.silver) {
      setError({
        error: true,
        msg: 'Invalid Number of Silver Tickets to refund',
      });
      return false;
    }
    if (bronzeTicketCnt < 0 || bronzeTicketCnt > purchase.tickets.bronze) {
      setError({
        error: true,
        msg: 'Invalid Number of Bronze Tickets to refund',
      });
      return false;
    }

    return true;
  }, [
    acknowledge,
    platinumTicketCnt,
    goldTicketCnt,
    silverTicketCnt,
    bronzeTicketCnt,
    purchase,
  ]);

  // Submit Form
  const formSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (event: React.SyntheticEvent): void => {
      event.preventDefault();
      setDisabled(true);

      // Validity Check
      if (!validityCheck()) {
        setDisabled(false);
        return;
      }

      // TODO: Submit API request
      console.log('Refund Request');
      console.log(`Platinum Ticket Cnt: ${platinumTicketCnt}`);
      console.log(`Gold Ticket Cnt: ${goldTicketCnt}`);
      console.log(`Silver Ticket Cnt: ${silverTicketCnt}`);
      console.log(`Bronze Ticket Cnt: ${bronzeTicketCnt}`);
      console.log(`Note: ${note}`);
      console.log(`Acknowledgement: ${acknowledge}`);

      handleClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      platinumTicketCnt,
      goldTicketCnt,
      silverTicketCnt,
      bronzeTicketCnt,
      note,
      acknowledge,
    ]
  );

  const gameDateString = new Date(
    game.year,
    game.month - 1,
    game.day
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle.ModalWrapper}>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={modalStyle.ModalTitle}
            >
              Request Refund
            </Typography>
            <Typography variant="body1" component="div" align="left">
              {`You are requesting refund for game of ${gameDateString} with ${game.opponent}.`}
            </Typography>
            <Divider sx={modalStyle.DividerMargin} />
            <Box>
              <form onSubmit={formSubmit}>
                <TextField
                  select
                  fullWidth
                  label="Platinum Tickets"
                  value={platinumTicketCnt}
                  onChange={onPlatinumTicketCntChange}
                  helperText="Please choose the number of platinum tickets you want to refund"
                  sx={modalStyle.TextFieldMargin}
                >
                  {new Array(purchase.tickets.platinum + 1)
                    .fill(0)
                    .map((_value, index) => (
                      <MenuItem key={`Platinum-${index}`} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Gold Tickets"
                  value={goldTicketCnt}
                  onChange={onGoldTicketCntChange}
                  helperText="Please choose the number of gold tickets you want to refund"
                  sx={modalStyle.TextFieldMargin}
                >
                  {new Array(purchase.tickets.gold + 1)
                    .fill(0)
                    .map((_value, index) => (
                      <MenuItem key={`Gold-${index}`} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Silver Tickets"
                  value={silverTicketCnt}
                  onChange={onSilverTicketCntChange}
                  helperText="Please choose the number of silver tickets you want to refund"
                  sx={modalStyle.TextFieldMargin}
                >
                  {new Array(purchase.tickets.silver + 1)
                    .fill(0)
                    .map((_value, index) => (
                      <MenuItem key={`Silver-${index}`} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Bronze Tickets"
                  value={bronzeTicketCnt}
                  onChange={onBronzeTicketCntChange}
                  helperText="Please choose the number of bronze tickets you want to refund"
                  sx={modalStyle.TextFieldMargin}
                >
                  {new Array(purchase.tickets.bronze + 1)
                    .fill(0)
                    .map((_value, index) => (
                      <MenuItem key={`Bronze-${index}`} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  label="Note/Memo"
                  multiline
                  fullWidth
                  rows={2}
                  value={note}
                  onChange={onNoteChange}
                  onKeyPress={onKeyPress}
                  placeholder="Why do you request refund?"
                  sx={modalStyle.TextFieldMargin}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acknowledge}
                      onChange={onAcknowledgeChange}
                    />
                  }
                  label="Refund may take upto 3 weeks."
                  sx={modalStyle.TextFieldMargin}
                />
                <Box sx={modalStyle.ButtonWrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={disabled}
                  >
                    Refund
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClose}
                    disabled={disabled}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
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
    </>
  );
}

export default RefundModal;
