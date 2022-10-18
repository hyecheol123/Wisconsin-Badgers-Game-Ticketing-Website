/**
 * Landing Page of Wisconsin Badgers Game Ticketing Website
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Global Style

/**
 * React functinoal component for LandingPage
 *
 * @return {React.ReactElement} Renders Landing Page
 */
function LandingPage(): React.ReactElement {
  return (
    <>
      <Header />
      <div>Some Contents</div>
      <Footer />
    </>
  );
}

export default LandingPage;
