/**
 * Component to render the Header
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Material UI
import { Box, Link, Stack } from '@mui/material';
// Components
import AccountBtn from './AccountBtn';
// Styles
import styles from './HeaderStyle';

/**
 * React functional component to generate header
 *
 * @return {React.ReactElement} Render header
 */
function Header(): React.ReactElement {
  // React Router
  const navigate = useNavigate();

  // Function to move to the main page
  const toMain = React.useCallback((): void => {
    navigate('/');
  }, [navigate]);

  return (
    <Box sx={styles.headerWrapper}>
      <Stack direction="row" sx={styles.headerTitleWrapper}>
        <Link variant="h5" underline="none" sx={styles.websiteTitle} onClick={toMain}>
          Badgers Game Ticket
        </Link>
      </Stack>
      <AccountBtn />
    </Box>
  );
}

export default React.memo(Header);
