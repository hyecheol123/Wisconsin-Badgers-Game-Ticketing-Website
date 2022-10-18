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
  const myPage = React.useCallback((): void => {
    navigate('/mypage');
  }, [navigate]);

  // function to move to the changePW screen
  const changePW = React.useCallback((): void => {
    navigate('/changePW', { state: { prevLocation: location.pathname } });
  }, [location.pathname, navigate]);

  // Function to logout from session
  const logout = React.useCallback((): void => {
    // TODO: API Call to logout
    localStorage.removeItem('LOGIN');
    loginContext.dispatch({ type: 'LOGOUT' });

    // Close User Menu
    handleCloseUserMenu();
  }, [loginContext, handleCloseUserMenu]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ padding: '4px' }}>
        <AccountCircle sx={{ height: '32px', width: '32px', color: 'white' }} />
      </IconButton>
      <Menu
        sx={{ mt: '35px' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={myPage}>
          <Typography textAlign="center">My Page</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={changePW}>
          <Typography textAlign="center">Change PW</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography textAlign="center" sx={{ color: 'red', fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default React.memo(AccountBtn);
