/**
 * Game Detail Page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import { Box, Typography } from '@mui/material';
// Component
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Styles
import contentStyle from './globalStyles/contentStyle';
import GameDetailStyle from './GameDetailStyle';

/**
 * React functional component for Game Detail Page
 *
 * @return {React.ReactElement} Renders Game Detail page
 */
function GameDetail(): React.ReactElement {
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
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default GameDetail;
