/**
 * Component to render the Header
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Router
// Material UI
import { Box, Stack, Typography } from '@mui/material';
// Components
// Styles
import styles from './HeaderStyle';

/**
 * React functional component to generate header
 *
 * @return {React.ReactElement} Render header
 */
function Header(): React.ReactElement {
  return (
    <Box sx={styles.headerWrapper}>
      <Stack direction="row" sx={styles.headerTitleWrapper}>
        <Typography variant="h5" component="div" sx={styles.websiteTitle}>
          Badgers Game Ticket
        </Typography>
      </Stack>
    </Box>
  );
}

export default Header;
