/**
 * Landing Page of Wisconsin Badgers Game Ticketing Website
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Material UI
import { Box, Button, Typography } from '@mui/material';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Styles
import landingPageStyle from './LandingPageStyle';
import contentStyle from './globalStyles/contentStyle';
// Images
import groupPhoto from '../assets/wisconsin-badgers-athletes-group.jpeg';
import stadiumPhoto from '../assets/camp-randall-stadium.jpg';

/**
 * React functinoal component for LandingPage
 *
 * @return {React.ReactElement} Renders Landing Page
 */
function LandingPage(): React.ReactElement {
  // React Router
  const navigate = useNavigate();

  // Function to move to the game list page
  const gameList = React.useCallback((): void => {
    navigate('/games');
  }, [navigate]);

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <img
            style={landingPageStyle.GroupPhoto}
            src={groupPhoto}
            alt="Wisconsin Badgers Football Team Group"
          />
          <Box sx={landingPageStyle.TextWrapper}>
            <Typography
              variant="h3"
              align="center"
              component="div"
              sx={landingPageStyle.Title}
            >
              Welcome to Wisconsin Badgers Ticketing Site!
            </Typography>
            <Box sx={landingPageStyle.BodyWrapper}>
              <Typography variant="body1" align="left">
                This is a website to purchase the home game ticket of Wisconsin
                Badgers Football team. Briefly introduce about the Wisconsin
                Badger Football, it represents the University of
                Wisconsin-Madison in the sport of American football. Wisconsin
                competes in the Football Bowl Subdivision (FBS) of the National
                Collegiate Athletic Association (NCAA) and the West Division of
                the Big Ten Conference (Big Ten). The Badgers have competed in
                the Big Ten since its formation in 1896. They play their home
                games at Camp Randall Stadium, the fourth-oldest stadium in
                college football. Wisconsin is one of 26 College football
                programs to win 700 or more games. Wisconsin has had two Heisman
                Trophy winners, Alan Ameche and Ron Dayne, and has had eleven
                former players inducted into the College Football Hall of Fame.
              </Typography>
            </Box>
            <img
              style={landingPageStyle.StadiumPhoto}
              src={stadiumPhoto}
              alt="Camp Randall Stadium"
            />
            <Typography
              variant="h6"
              align="center"
              sx={landingPageStyle.CheckoutMsg}
            >
              Check out the game tickets now!!
            </Typography>
            <Button
              variant="contained"
              onClick={gameList}
              sx={landingPageStyle.CheckoutBtn}
            >
              Explore Tickets
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default LandingPage;
