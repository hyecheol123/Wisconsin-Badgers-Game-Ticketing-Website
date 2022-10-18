/**
 * User Login Page
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
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
// Custom Hook to load LoginContext
import { useLoginContext } from './LoginContext';
// Global Style
import styles from './globalStyles/accountStyle';

type error = {
  error: boolean;
  msg: string;
};

/**
 * React Functional Component to generate Login view
 *
 * @return {React.ReactElement} Renders login view
 */
function Login(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();
  // State
  const loginContext = useLoginContext();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<error>({ error: false, msg: '' });

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

  // EventHandlers to modify form input
  const onUsernameChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent): void => {
      setUsername((event.target as HTMLInputElement).value);
    },
    []
  );
  const onPasswordChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent): void => {
      setPassword((event.target as HTMLInputElement).value);
    },
    []
  );

  // Helper function to check input
  const inputCheck = React.useCallback((): boolean => {
    // Username/Password is not valid when it is empty
    if (username === '' || password === '') {
      setError({
        error: true,
        msg: 'Both username and password are required field!',
      });
      return false;
    }
    return true;
  }, [username, password]);

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

      // TODO: Submit Login API Request
      console.log('Login Request');
      console.log(username);
      console.log(password);
      localStorage.setItem('LOGIN', 'yes');
      loginContext.dispatch({ type: 'LOGIN' });
      goBack();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputCheck, loginContext, password, username]
  );

  // EventHandler to close alert
  const closeAlert = React.useCallback(() => {
    setError({ error: false, msg: '' });
  }, []);

  // Check for whether user already logged in or not
  React.useEffect(() => {
    if (loginContext.login) {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loginContext.login && (
        <>
          <Box sx={styles.Wrapper}>
            <Typography variant="h5" sx={{ mb: '10px' }}>
              Login
            </Typography>
            <form onSubmit={formSubmit} style={styles.FormWrapper}>
              <TextField
                disabled={disabled}
                size="small"
                variant="outlined"
                color="primary"
                label="username"
                margin="normal"
                value={username}
                onChange={onUsernameChange}
                sx={{ margin: '5px 0', width: '100%' }}
              ></TextField>
              <TextField
                disabled={disabled}
                size="small"
                variant="outlined"
                color="primary"
                label="password"
                type="password"
                margin="normal"
                value={password}
                onChange={onPasswordChange}
                sx={{ margin: '5px 0', width: '100%' }}
              ></TextField>
              <Box sx={styles.ButtonWrapper}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                  sx={{ width: 'calc(50% - 10px)' }}
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={disabled}
                  sx={{ width: 'calc(50% - 10px)' }}
                  onClick={goBack}
                >
                  Cancel
                </Button>
              </Box>
            </form>
            <Link href="/signup" variant="body2" sx={styles.SignUpLink}>
              Create New Account
            </Link>
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

export default Login;
