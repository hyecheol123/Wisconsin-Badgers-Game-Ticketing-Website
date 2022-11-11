/**
 * Modal which helps users to purchase/checkout the tickets
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
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
// Global Type
import Error from '../../globalTypes/FormError';
// Style
import modalStyle from '../../globalStyles/modalStyle';

// Type for the component's props
type PurchaseModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  gameDateString: string;
  opponentTeam: string;
  ticketCounts: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  ticketPrice: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
};

/**
 * React functional component to generate modal which helps user to purchase/checkout the tickets
 *
 * @param {PurchaseModalProps} props Properties that passed from the parent Component.
 * @return {React.ReactElement} Renders Purchase Modal
 */
function PurchaseModal(props: PurchaseModalProps): React.ReactElement {
  const { isOpen, handleClose, gameDateString } = props;
  const { opponentTeam, ticketCounts, ticketPrice } = props;

  // React Router
  const navigate = useNavigate();

  // State
  const [cardNumber, setCardNumber] = React.useState<string>('');
  const [securityCode, setSecurityCode] = React.useState<string>('');
  const [expMonth, setExpMonth] = React.useState<number>(0);
  const [expYear, setExpYear] = React.useState<string>('');
  const [cardHolder, setCardHolder] = React.useState<string>('');
  const [zipCode, setZipCode] = React.useState<string>('');
  const [acknowledge, setAcknowledge] = React.useState<boolean>(false);
  const [noResell, setNoResell] = React.useState<boolean>(false);
  const [refundTerm, setRefundTerm] = React.useState<boolean>(false);
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
  const onNoResellChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setNoResell(event.target.checked);
    },
    []
  );
  const onRefundTermChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRefundTerm(event.target.checked);
    },
    []
  );
  const onCardNumberChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      if (/([^0-9])/.test(value)) {
        setError({ error: true, msg: 'Only Numbers are Accepted' });
      } else if (value.length > 16) {
        setError({ error: true, msg: 'Card Number should be 15 ~ 16 digits' });
      } else {
        setCardNumber(value);
      }
    },
    []
  );
  const onSecurityCodeChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      if (/([^0-9])/.test(value)) {
        setError({ error: true, msg: 'Only Numbers are Accepted' });
      } else if (value.length > 4) {
        setError({ error: true, msg: 'Security code should be 3 ~ 4 digits' });
      } else {
        setSecurityCode(value);
      }
    },
    []
  );
  const onExpMonthChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setExpMonth(parseInt(event.target.value));
    },
    []
  );
  const onExpYearChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      if (/([^0-9])/.test(value)) {
        setError({ error: true, msg: 'Only Numbers are Accepted' });
      } else if (value.length > 4) {
        setError({ error: true, msg: 'Expiry year should be 4 digits' });
      } else {
        setExpYear(value);
      }
    },
    []
  );
  const onCardHolderChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setCardHolder(event.target.value);
    },
    []
  );
  const onZipCodeChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setZipCode(event.target.value);
    },
    []
  );

  // EventHandler to close alert
  const closeAlert = React.useCallback(() => {
    setError({ error: false, msg: '' });
  }, []);

  // Validity Check
  const validityCheck = React.useCallback((): boolean => {
    // Agree to all terms and conditions
    if (!acknowledge || !noResell || !refundTerm) {
      setError({
        error: true,
        msg: 'You have to agree with all terms and conditions',
      });
      return false;
    }

    // No empty field
    if (
      cardNumber.length === 0 ||
      securityCode.length === 0 ||
      expMonth === 0 ||
      expYear.length === 0 ||
      cardHolder.length === 0 ||
      zipCode.length === 0
    ) {
      setError({ error: true, msg: 'All fields are required' });
      return false;
    }

    // Card number should have either 15 or 16 digits
    if (cardNumber.length > 16 || cardNumber.length < 15) {
      setError({ error: true, msg: 'Card Number should be 15 ~ 16 digits' });
      return false;
    }

    // card security code should be either 3 or 4 digits
    if (securityCode.length > 4 || securityCode.length < 3) {
      setError({ error: true, msg: 'Security code should be 3 ~ 4 digits' });
      return false;
    }

    // exp year should be 4 digit
    if (expYear.length !== 4) {
      setError({ error: true, msg: 'Expiry year should be 4 digits' });
      return false;
    }

    return true;
  }, [
    acknowledge,
    cardHolder,
    cardNumber,
    expMonth,
    expYear,
    noResell,
    refundTerm,
    securityCode,
    zipCode,
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
      console.log('Purchase');
      console.log('Detail hided for security reasons');

      // Redirect to the confirmation page
      handleClose();
      navigate('/confirm/1234');
    },
    [validityCheck]
  );

  const totalNumTickets =
    ticketCounts.platinum +
    ticketCounts.gold +
    ticketCounts.silver +
    ticketCounts.bronze;

  const totalTicketPrice =
    ticketCounts.platinum * ticketPrice.platinum +
    ticketCounts.gold * ticketPrice.gold +
    ticketCounts.silver * ticketPrice.silver +
    ticketCounts.bronze * ticketPrice.bronze;

  const month = [
    { value: 0, label: 'Choose Month' },
    { value: 1, label: '01 - January' },
    { value: 2, label: '02 - February' },
    { value: 3, label: '03 - March' },
    { value: 4, label: '04 - April' },
    { value: 5, label: '05 - May' },
    { value: 6, label: '06 - June' },
    { value: 7, label: '07 - July' },
    { value: 8, label: '08 - August' },
    { value: 9, label: '09 - September' },
    { value: 10, label: '10 - October' },
    { value: 11, label: '11 - November' },
    { value: 12, label: '12 - December' },
  ];

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        components={{ Backdrop }}
        componentsProps={{ backdrop: { transitionDuration: 500 } }}
      >
        <Fade in={isOpen}>
          <Box sx={modalStyle.ModalWrapper}>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={modalStyle.ModalTitle}
            >
              Payment
            </Typography>
            <Typography variant="h6" component="div" align="center">
              {`${gameDateString} | vs ${opponentTeam}`}
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" align="left">
                  <strong>{`Platinum Ticket ($${ticketPrice.platinum}): `}</strong>
                  {ticketCounts.platinum}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" align="left">
                  <strong>{`Gold Ticket ($${ticketPrice.gold}): `}</strong>
                  {ticketCounts.gold}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" align="left">
                  <strong>{`Silver Ticket ($${ticketPrice.silver}): `}</strong>
                  {ticketCounts.silver}
                </Typography>
              </li>
              <li>
                <Typography variant="body1" align="left">
                  <strong>{`Bronze Ticket ($${ticketPrice.bronze}): `}</strong>
                  {ticketCounts.bronze}
                </Typography>
              </li>
            </ul>
            <Typography>
              To purchase <strong>{`${totalNumTickets} tickets`}</strong> listed
              above, you have to pay <strong>{`$${totalTicketPrice}`}</strong>.
            </Typography>
            <Divider sx={modalStyle.DividerMargin} />
            <Box>
              <form onSubmit={formSubmit}>
                <TextField
                  fullWidth
                  label="Card Number"
                  value={cardNumber}
                  onChange={onCardNumberChange}
                  onKeyPress={onKeyPress}
                  sx={modalStyle.TextFieldMargin}
                />
                <TextField
                  fullWidth
                  label="Card Holder Name"
                  value={cardHolder}
                  onChange={onCardHolderChange}
                  onKeyPress={onKeyPress}
                  sx={modalStyle.TextFieldMargin}
                />
                <Box sx={{ ...modalStyle.TextFieldMargin, display: 'flex' }}>
                  <TextField
                    select
                    fullWidth
                    label="Expiry Month"
                    value={expMonth}
                    onChange={onExpMonthChange}
                    sx={{ marginRight: '0.5em' }}
                  >
                    {month.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Expiry Year"
                    value={expYear}
                    onChange={onExpYearChange}
                    onKeyPress={onKeyPress}
                    sx={{ marginLeft: '0.5em' }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Security Code"
                  value={securityCode}
                  onChange={onSecurityCodeChange}
                  onKeyPress={onKeyPress}
                  sx={modalStyle.TextFieldMargin}
                />
                <TextField
                  fullWidth
                  label="Billing Address Zip Code"
                  value={zipCode}
                  onChange={onZipCodeChange}
                  onKeyPress={onKeyPress}
                  sx={modalStyle.TextFieldMargin}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acknowledge}
                      onChange={onAcknowledgeChange}
                    />
                  }
                  label="By purchase tickets, you agree to the Terms and Condition."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={refundTerm}
                      onChange={onRefundTermChange}
                    />
                  }
                  label="You cannot get refund within 2 days before the game start."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={noResell} onChange={onNoResellChange} />
                  }
                  label="Reselling tickets is prohibitied."
                />
                <Box sx={modalStyle.ButtonWrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={disabled}
                  >
                    Purchase
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

export default PurchaseModal;
