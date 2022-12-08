/**
 * Component to render account button
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Material UI
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
// Material UI Icon
import { AccountCircle } from '@mui/icons-material';
// Custom Hooks to load LoginContext
import { useLoginContext } from '../../LoginContext';
// Style
import styles from './AccountBtnStyle';
import { signOut } from 'firebase/auth';

/**
 * React Functional Component to generate account button
 *
 * @return {React.ReactElement} Renders account button
 */
function AccountBtn(): React.ReactElement {
  // React Router
  const navigate = useNavigate();
  const location = useLocation();
  // Login Context (global)
  const loginContext = useLoginContext();
  // State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // EventHandler to open user menu
  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      if (loginContext.login) {
        // When user logged in, open user menu
        setAnchorEl(event.currentTarget);
      } else {
        // When user not logged in, redirect to the login page
        navigate('/login', { state: { prevLocation: location.pathname } });
      }
    },
    [loginContext.login, navigate, location.pathname]
  );

  // EventHandler to close user menu
  const handleCloseUserMenu = React.useCallback((): void => {
    setAnchorEl(null);
  }, []);

  // function to move to the my page screen
  const myTickets = React.useCallback((): void => {
    navigate('/tickets');
  }, [navigate]);

  // function to move to the changePW screen
  const changePW = React.useCallback((): void => {
    navigate('/changePW', { state: { prevLocation: location.pathname } });
  }, [location.pathname, navigate]);

  // Function to logout from session
  const logout = React.useCallback(async (): Promise<void> => {
    // API Call to logout
    await signOut(loginContext.firebaseAuth);
    loginContext.dispatch({ type: 'LOGOUT' });

    // Close User Menu
    handleCloseUserMenu();

    // Navigate to the main menu
    navigate('/');
  }, [loginContext, handleCloseUserMenu, navigate]);

  return (
    <Box sx={styles.Wrapper}>
      <IconButton onClick={handleOpenUserMenu} sx={styles.IconWrapper}>
        <AccountCircle sx={styles.Icon} />
      </IconButton>
      <Menu
        sx={styles.MenuWrapper}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={myTickets}>
          <Typography textAlign="center">My Tickets</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={changePW}>
          <Typography textAlign="center">Change PW</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography textAlign="center" sx={styles.MenuHighlight}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default React.memo(AccountBtn);
