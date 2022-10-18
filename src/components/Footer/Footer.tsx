/**
 * Component to render the Footer
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
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
  return (
    <Box sx={styles.footerWrapper}>
      <Typography align="center" variant="body2" sx={styles.text}>
        Copyright © 2019 By <Link href="https://hcjang.com">Hyecheol (Jerry) Jang</Link> & <Link href="https://pages.cs.wisc.edu/~linn/WaiZinPage/">Wai Zin Linn</Link>.
      </Typography>
      <Typography align="center" variant="body2" sx={{ ...styles.boldText, ...styles.text }}>
        THIS IS NOT A REAL WEBSITE TO PURCHASE THE TICKETS FOR WISCONSIN BADGERS GAMES.
      </Typography>
      <Link align="center" href="/terms" variant="caption" sx={{ ...styles.termsLink, ...styles.text }}>Terms and Condition</Link>
    </Box>
  );
}

export default React.memo(Footer);
