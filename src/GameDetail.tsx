/**
 * Game Detail Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
// Component
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Styles
import contentStyle from './globalStyles/contentStyle';
import GameDetailStyle from './GameDetailStyle';
import formBoxStyleProvider from './globalStyles/formBoxStyleProvider';
import formStyle from './globalStyles/formStyle';

/**
 * React functional component for Game Detail Page
 *
 * @return {React.ReactElement} Renders Game Detail page
 */
function GameDetail(): React.ReactElement {
  // Generate style for the form box
  const theme = useTheme();

  // States
  // const [error, _setError] = React.useState<boolean>(false);
  const [platinumTicketCnt, setPlatinumTicketCnt] = React.useState<number>(0);
  const [goldTicketCnt, setGoldTicketCnt] = React.useState<number>(0);
  const [silverTicketCnt, setSilverTicketCnt] = React.useState<number>(0);
  const [bronzeTicketCnt, setBronzeTicketCnt] = React.useState<number>(0);

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

  const availableTicketCnt = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
  ];

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" align="center" sx={contentStyle.PageTitle}>
            vs Opponent Team
          </Typography>
          <Typography variant="body1" align="left">
            <strong>Date:</strong> Nov. 11. 2022 16:00
          </Typography>
          <Typography variant="body1" align="left">
            <strong>Stadium:</strong> Camp Randall Stadium
          </Typography>
          <Box sx={GameDetailStyle.TeamWrapper}>
            <Box sx={GameDetailStyle.TeamContent}>
              <Box sx={GameDetailStyle.Team}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/350px-Wisconsin_Badgers_logo.svg.png"
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/350px-Wisconsin_Badgers_logo.svg.png"
                  alt="Wisconsin Badgers"
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
              <Typography variant="body1" align="left">The ticket grade indicates the distance between the seat and the field. The platinum ticket is closest to the field, followed by gold, silver, and bronze.</Typography>
              <Divider sx={GameDetailStyle.PurchaseDivider}/>
              <TextField
                select
                fullWidth
                label="Platinum Tickets - $80"
                value={platinumTicketCnt}
                onChange={onPlatinumTicketCntChange}
                helperText="Please choose the number of platinum tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {availableTicketCnt.map((option) => (
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
                label="Gold Tickets - $65"
                value={goldTicketCnt}
                onChange={onGoldTicketCntChange}
                helperText="Please choose the number of gold tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {availableTicketCnt.map((option) => (
                  <MenuItem key={`Gold-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Silver Tickets - $50"
                value={silverTicketCnt}
                onChange={onSilverTicketCntChange}
                helperText="Please choose the number of silver tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {availableTicketCnt.map((option) => (
                  <MenuItem key={`Silver-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Bronze Tickets - $35"
                value={bronzeTicketCnt}
                onChange={onBronzeTicketCntChange}
                helperText="Please choose the number of bronze tickets you want to purchase"
                sx={GameDetailStyle.Selection}
              >
                {availableTicketCnt.map((option) => (
                  <MenuItem key={`Bronze-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={GameDetailStyle.ButtonWrapper}>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
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
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default GameDetail;
