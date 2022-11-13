/**
 * Page for the users to change their password
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Material UI
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
// Global Types
import Error from './globalTypes/FormError';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Global Style
import styles from './globalStyles/accountStyle';

// Demo data
import defaultLoginUser from './demoData/loginUser';

/**
 * React functional component to generate change password view
 *
 * @return {React.ReactElement} Renders change password view
 */
function ChangePW(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get users (demo data)
  const newUsersString = sessionStorage.getItem('users');
  const newUsers = newUsersString !== null ? JSON.parse(newUsersString) : [];

  // State
  const loginContext = useLoginContext();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [currentPW, setCurrentPW] = React.useState<string>('');
  const [newPW, setNewPW] = React.useState<string>('');
  const [confirmPW, setConfirmPW] = React.useState<string>('');
  const [error, setError] = React.useState<Error>({ error: false, msg: '' });

  // Function to direct user to previous location
  const goBack = React.useCallback((): void => {
    const prevLocation = (state as { prevLocation: string })?.prevLocation;
    if (prevLocation) {
      navigate(prevLocation);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // EventHandlers to modify form inputs
  const onCurrentPWChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setCurrentPW((event.target as HTMLInputElement).value),
    []
  );
  const onNewPWChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setNewPW((event.target as HTMLInputElement).value),
    []
  );
  const onConfirmPWChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setConfirmPW((event.target as HTMLInputElement).value),
    []
  );

  // Helper function to check input
  const inputCheck = React.useCallback((): boolean => {
    if (currentPW === '' || newPW === '' || confirmPW === '') {
      // All field should not be empty
      setError({ error: true, msg: 'All fields are required!!' });
      return false;
    } else if (currentPW === newPW) {
      // current PW and new PW cannot be same
      setError({
        error: true,
        msg: 'Current password and new password should be different',
      });
      return false;
    } else if (newPW !== confirmPW) {
      // new password and confirm password is different
      setError({
        error: true,
        msg: 'New password and confirm password are different. Please check again',
      });
      return false;
    }
    return true;
  }, [confirmPW, currentPW, newPW]);

  // Submit Event Handler
  const formSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      setDisabled(true);
      // Check validity of inputs
      if (!inputCheck()) {
        setDisabled(false);
        return;
      }

      // Submit API Request
      const currentUserEmail = loginContext.email;
      let currentUser;
      let willUpdate = -1;
      if (defaultLoginUser[0].email === currentUserEmail) {
        currentUser = defaultLoginUser[0];
      }
      for (let idx = 0; idx < newUsers.length; idx++) {
        if (newUsers[idx].email === currentUserEmail) {
          currentUser = newUsers[idx];
          willUpdate = idx;
          break;
        }
      }
      if (currentPW === currentUser.password) {
        // TODO: Password Change
        if (willUpdate !== -1) {
          newUsers[willUpdate].password = newPW;
          sessionStorage.setItem('users', JSON.stringify(newUsers));
        }
        goBack();
      } else {
        // Change PW Fail Error Message
        setError({
          error: true,
          msg: 'Current Password Not Correct',
        });
        setDisabled(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmPW, currentPW, newPW, goBack, inputCheck]
  );

  // EventHandler to close alert
  const closeAlert = React.useCallback(() => {
    setError({ error: false, msg: '' });
  }, []);

  // Check whether user is signed in or not
  // Only allow for signed in admin user
  React.useEffect(() => {
    if (!loginContext.login) {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loginContext.login && (
        <>
          <Box sx={styles.Wrapper}>
            <Typography variant="h5" sx={styles.Title}>
              Change Password
            </Typography>
            <form onSubmit={formSubmit} style={styles.Form}>
              <Box sx={styles.FormContent}>
                <TextField
                  disabled={disabled}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Current Password"
                  type="password"
                  margin="normal"
                  value={currentPW}
                  onChange={onCurrentPWChange}
                  sx={styles.TextField}
                />
                <TextField
                  disabled={disabled}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="New Password"
                  type="password"
                  margin="normal"
                  value={newPW}
                  onChange={onNewPWChange}
                  sx={styles.TextField}
                />
                <TextField
                  disabled={disabled}
                  size="small"
                  variant="outlined"
                  color="primary"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  value={confirmPW}
                  onChange={onConfirmPWChange}
                  sx={styles.TextField}
                />
                <Box sx={styles.ButtonWrapper}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={disabled}
                    sx={styles.Button}
                  >
                    Change PW
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={disabled}
                    sx={styles.Button}
                    onClick={goBack}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={5000}
            open={error.error}
            onClose={closeAlert}
          >
            <Alert onClose={closeAlert} severity="error">
              {error.msg}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}

export default ChangePW;
