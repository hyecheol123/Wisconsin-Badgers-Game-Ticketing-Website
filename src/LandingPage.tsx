/**
 * Landing Page of Wisconsin Badgers Game Ticketing Website
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import { Box, Button, Typography } from '@mui/material';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Global Style
// Images
import groupPhoto from '../assets/wisconsin-badgers-athletes-group.jpeg';
import stadiumPhoto from '../assets/camp-randall-stadium.jpg'

/**
 * React functinoal component for LandingPage
 *
 * @return {React.ReactElement} Renders Landing Page
 */
function LandingPage(): React.ReactElement {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            margin: '1em 0.5em 4em 0.5em',
            width: 'calc(100%-1em)',
            maxWidth: '1024px',
          }}
        >
          <img
            style={{ width: '100%' }}
            src={groupPhoto}
            alt="Wisconsin Badgers Football Team Group"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              align="center"
              component="div"
              sx={{ margin: '1.5em 0' }}
            >
              Welcome to Wisconsin Badgers Ticketing Site!
            </Typography>
            <Box sx={{ width: '100%', padding: '0 0.5em' }}>
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
            style={{ width: '70%', margin: '2.5em 0 1em 0'  }}
            src={stadiumPhoto}
            alt="Camp Randall Stadium"
          />
            <Typography variant="h6" align="center" sx={ {margin: '1.5em 0 1em 0' } }>
                Check out the game tickets now!!
              </Typography>
            <Button variant="contained" sx={{ margin: '1em 0 1.5em 0', flexGrow: 0 }}>
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
