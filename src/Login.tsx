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
// Global Type
import Error from './globalTypes/FormError';
// Custom Hook to load LoginContext
import { useLoginContext } from './LoginContext';
// Global Style
import styles from './globalStyles/accountStyle';

// Demo data
import loginUser from './demoData/loginUser';

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
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
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

  // Function to direct user to the signup page
  const toSignUp = React.useCallback((): void => {
    navigate('/signup');
  }, [navigate]);

  // EventHandlers to modify form input
  const onEmailChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent): void => {
      setEmail((event.target as HTMLInputElement).value);
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
    // Email/Password is not valid when it is empty
    if (email === '' || password === '') {
      setError({
        error: true,
        msg: 'Both email and password are required field!',
      });
      return false;
    }

    // Email format check
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError({
        error: true,
        msg: 'Not a vaild email format',
      });
      return false;
    }

    return true;
  }, [email, password]);

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

      // Submit Login API Request
      if (
        email.toLowerCase() === loginUser.email &&
        password === loginUser.password
      ) {
        localStorage.setItem('LOGIN', 'yes');
        loginContext.dispatch({ type: 'LOGIN' });
        goBack();
      } else {
        // Login Fail Error Message
        setError({
          error: true,
          msg: 'Cannot find user with given email and password',
        });
        setDisabled(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputCheck, loginContext, password, email]
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
  }, [loginContext]);

  return (
    <>
      {!loginContext.login && (
        <>
          <Box sx={styles.Wrapper}>
            <Typography variant="h5" sx={styles.Title}>
              Login
            </Typography>
            <form onSubmit={formSubmit} style={styles.FormWrapper}>
              <TextField
                disabled={disabled}
                size="small"
                variant="outlined"
                color="primary"
                label="email"
                margin="normal"
                value={email}
                onChange={onEmailChange}
                sx={styles.TextField}
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
                sx={styles.TextField}
              ></TextField>
              <Box sx={styles.ButtonWrapper}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                  sx={styles.Button}
                >
                  Login
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
            </form>
            <Link onClick={toSignUp} variant="body2" sx={styles.SignUpLink}>
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
