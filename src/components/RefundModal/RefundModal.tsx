/**
 * Modal which helps users to request refund for the ticket
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
// Style
import modalStyle from '../../globalStyles/modalStyle';

// Type for the component's props
type RefundModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

/**
 * React functional component to generate modal which helps user to request refund.
 *
 * @param {RefundModalProps} props Properties that passed from the parent Component.
 * @return {React.ReactElement} Renders Refund Request Modal
 */
function RefundModal(props: RefundModalProps): React.ReactElement {
  const { isOpen, handleClose } = props;

  // State
  const [platinumTicketCnt, setPlatinumTicketCnt] = React.useState<number>(2);
  const [goldTicketCnt, setGoldTicketCnt] = React.useState<number>(1);
  const [silverTicketCnt, setSilverTicketCnt] = React.useState<number>(1);
  const [bronzeTicketCnt, setBronzeTicketCnt] = React.useState<number>(2);
  const [note, setNote] = React.useState<string>('');
  const [acknowledge, setAcknowledge] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);

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

  // TODO: Validity Check

  // Submit Form
  const formSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (event: React.SyntheticEvent): void => {
      event.preventDefault();
      setDisabled(true);

      // TODO: Validity Check

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

  const uptoTwo = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
  ];

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
              You are requesting refund for Nov. 11. 2022's game with Opponent
              Team.
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
                  {uptoTwo.map((option) => (
                    <MenuItem
                      key={`Platinum-${option.value}`}
                      value={option.value}
                    >
                      {option.label}
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
                  {uptoTwo.slice(0, 2).map((option) => (
                    <MenuItem key={`Gold-${option.value}`} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Silver Tickets"
                  value={goldTicketCnt}
                  onChange={onSilverTicketCntChange}
                  helperText="Please choose the number of silver tickets you want to refund"
                  sx={modalStyle.TextFieldMargin}
                >
                  {uptoTwo.slice(0, 2).map((option) => (
                    <MenuItem
                      key={`Silver-${option.value}`}
                      value={option.value}
                    >
                      {option.label}
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
                  {uptoTwo.map((option) => (
                    <MenuItem
                      key={`Bronze-${option.value}`}
                      value={option.value}
                    >
                      {option.label}
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
    </>
  );
}

export default RefundModal;
