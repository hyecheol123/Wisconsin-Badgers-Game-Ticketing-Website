/**
 * Page for the users to change their password
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Google Firebase
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
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
import FormError from './globalTypes/FormError';
// Custom Hooks to load Login Context
import { useLoginContext } from './LoginContext';
// Global Style
import styles from './globalStyles/accountStyle';

/**
 * React functional component to generate change password view
 *
 * @return {React.ReactElement} Renders change password view
 */
function ChangePW(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();

  // State
  const loginContext = useLoginContext();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [currentPW, setCurrentPW] = React.useState<string>('');
  const [newPW, setNewPW] = React.useState<string>('');
  const [confirmPW, setConfirmPW] = React.useState<string>('');
  const [error, setError] = React.useState<FormError>({
    error: false,
    msg: '',
  });

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
    // Password Rule
    //   - More than 8 characters in total
    //   - Should be less than 25 characters in total
    //   - Should include at least one upper case
    //   - Should include at least one lower case
    //   - Should include at least one one number
    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;

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
    } else if (!passwordRegExp.test(newPW)) {
      setError({
        error: true,
        msg: 'Password should include one upper case/lower case/number!',
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
    async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setDisabled(true);

      // Check validity of inputs
      if (!inputCheck()) {
        setDisabled(false);
        return;
      }

      // Submit API Request
      if (loginContext.firebaseAuth) {
        try {
          // Check user's current password
          const { currentUser } = loginContext.firebaseAuth;
          if (currentUser && currentUser.email) {
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              currentPW
            );
            await reauthenticateWithCredential(currentUser, credential);
          } else {
            throw new Error('Firebase Error - No Current User');
          }

          // Update User's Password
          await updatePassword(currentUser, newPW);
          goBack();
        } catch (e) {
          if ((e as { code: string }).code === 'auth/wrong-password') {
            setError({
              error: true,
              msg: 'Current Password Not Correct',
            });
          } else {
            console.error(e);
            alert('An Error Occurred! Report to Admin!');
          }
        } finally {
          setDisabled(false);
        }
      } else {
        alert('An Error Occured! Report to Admin!');
        console.error('Firebase Auth Not Setup');
      }
    },
    [loginContext, currentPW, newPW, goBack, inputCheck]
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
