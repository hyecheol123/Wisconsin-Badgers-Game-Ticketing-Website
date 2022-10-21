/**
 * Component to render the Footer
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Material UI
import { Box, Link, Typography } from '@mui/material';
// Styles
import styles from './FooterStyle';

/**
 * React functional component to generate footer
 *
 * @return {React.ReactElement} Render footer
 */
function Footer(): React.ReactElement {
  // React Router
  const navigate = useNavigate();

  // Function to move to the terms and condition
  const toTerms = React.useCallback((): void => {
    navigate('/terms');
  }, [navigate]);

  return (
    <Box sx={styles.footerWrapper}>
      <Typography align="center" variant="body2" sx={styles.text}>
        Copyright © 2019 By{' '}
        <Link href="https://hcjang.com">Hyecheol (Jerry) Jang</Link>.
      </Typography>
      <Typography
        align="center"
        variant="body2"
        sx={{ ...styles.boldText, ...styles.text }}
      >
        THIS IS NOT A REAL TICKETING WEBSITE FOR WISCONSIN BADGERS GAMES.
      </Typography>
      <Link
        align="center"
        onClick={toTerms}
        variant="caption"
        sx={{ ...styles.termsLink, ...styles.text }}
      >
        Terms and Condition
      </Link>
    </Box>
  );
}

export default React.memo(Footer);
