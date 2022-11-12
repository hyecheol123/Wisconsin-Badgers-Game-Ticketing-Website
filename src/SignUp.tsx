/**
 * Sign up page - Where new users can create their account
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Material UI
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Type
import textFieldState from './globalTypes/FormTextFieldState';
// Custom Hook to load LoginContext
import { useLoginContext } from './LoginContext';
// Style
import contentStyle from './globalStyles/contentStyle';
import formStyle from './globalStyles/formStyle';
import formBoxStyleProvider from './globalStyles/formBoxStyleProvider';

/**
 * React functional component for SignUp
 *
 * @return {React.ReactElement} Render Signup Page
 */
function SignUp(): React.ReactElement {
  // React Router
  const { state } = useLocation();
  const navigate = useNavigate();

  // States
  const loginContext = useLoginContext();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [name, setName] = React.useState<textFieldState>({
    value: '',
    error: false,
    helperText: '',
  });
  const [email, setEmail] = React.useState<textFieldState>({
    value: '',
    error: false,
    helperText: '',
  });
  const [password, setPassword] = React.useState<textFieldState>({
    value: '',
    error: false,
    helperText: '',
  });
  const [passwordRetyped, setPasswordRetyped] = React.useState<textFieldState>({
    value: '',
    error: false,
    helperText: '',
  });

  // EventHandlers to prevent submit on enter
  const onKeyPress: React.KeyboardEventHandler = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    []
  );

  // EventHandlers to modify form input
  const onNameChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setName((prevName) => {
        return { ...prevName, value: (event.target as HTMLInputElement).value };
      }),
    []
  );
  const onEmailChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setEmail((prevEmail) => {
        return {
          ...prevEmail,
          value: (event.target as HTMLInputElement).value,
        };
      }),
    []
  );
  const onPasswordChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setPassword((prevPassword) => {
        return {
          ...prevPassword,
          value: (event.target as HTMLInputElement).value,
        };
      }),
    []
  );
  const onPasswordRetypedChange: React.ChangeEventHandler = React.useCallback(
    (event: React.ChangeEvent) =>
      setPasswordRetyped((prevPasswordRetyped) => {
        return {
          ...prevPasswordRetyped,
          value: (event.target as HTMLInputElement).value,
        };
      }),
    []
  );

  // Helper Function to check input
  const nameCheck = React.useCallback((): boolean => {
    // Name is not valid when it is empty
    if (name.value === '') {
      setName((prevName) => {
        return {
          ...prevName,
          error: true,
          helperText: 'Name is required field!',
        };
      });
      return false;
    } else if (name.error && name.value !== '') {
      // When user fix the error (enter name)
      setName((prevName) => {
        return { ...prevName, error: false, helperText: '' };
      });
      return true;
    }
    return true;
  }, [name]);
  const emailCheck = React.useCallback((): boolean => {
    // Email is not valid when it is empty
    if (email.value === '') {
      setEmail((prevEmail) => {
        return {
          ...prevEmail,
          error: true,
          helperText: 'Email is required field!',
        };
      });
      return false;
    } else if (
      !String(email.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      // Email is not valid when the format is wrong
      setEmail((prevEmail) => {
        return {
          ...prevEmail,
          error: true,
          helperText: 'Wrong Email Format',
        };
      });
      return false;
    } else if (email.error && email.value !== '') {
      // When user fix the error
      setEmail((prevEmail) => {
        return { ...prevEmail, error: false, helperText: '' };
      });
      return true;
    }
    return true;
  }, [email]);
  const passwordCheck = React.useCallback((): boolean => {
    // TODO: Password Rule - More than 8 characters in total, should include at least one upper case, one lower case, and one number
    if (password.value === '') {
      setPassword((prevPW) => {
        return {
          ...prevPW,
          error: true,
          helperText: 'Password is required field!',
        };
      });
      return false;
    } else if (password.error && password.value !== '') {
      // When user fix the error
      setPassword((prevPW) => {
        return { ...prevPW, error: false, helperText: '' };
      });
      return true;
    }
    return true;
  }, [password]);
  const passwordRetypedCheck = React.useCallback((): boolean => {
    if (passwordRetyped.value === '') {
      setPasswordRetyped((prevPWRetyped) => {
        return {
          ...prevPWRetyped,
          error: true,
          helperText: 'Retyped Password is required field!',
        };
      });
      return false;
    } else if (passwordRetyped.value !== password.value) {
      // Password and password retyped should be same
      setPasswordRetyped((prevPWRetyped) => {
        return {
          ...prevPWRetyped,
          error: true,
          helperText: 'Retyped password does not match with the password',
        };
      });
      return false;
    } else if (passwordRetyped.error && passwordRetyped.value !== '') {
      // When user fix the error
      setPasswordRetyped((prevPWRetyped) => {
        return {
          ...prevPWRetyped,
          error: false,
          helperText: '',
        };
      });
      return true;
    }
    return true;
  }, [passwordRetyped, password]);

  // Generate style of formBox
  const theme = useTheme();

  // Function to submit Form
  const formSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      setDisabled(true);

      // TODO: Check validity of inputs
      const validityCheck = [
        nameCheck(),
        emailCheck(),
        passwordCheck(),
        passwordRetypedCheck(),
      ];
      if (validityCheck.includes(false)) {
        setDisabled(false);
        return;
      }

      // TODO: API Calls
      const newUsersString = sessionStorage.getItem('users');
      const newUsers =
        newUsersString !== null ? JSON.parse(newUsersString) : [];
      const userInfo = {
        email: email.value,
        password: password.value,
        name: name.value,
      };
      newUsers.push(userInfo);
      sessionStorage.setItem('users', JSON.stringify(newUsers));
      setDisabled(false);

      // Alert
      alert('New User Created!!');

      // Return to the previous view
      const prevLocation = (state as { prevLocation: string })?.prevLocation;
      if (prevLocation) {
        navigate(prevLocation);
      } else {
        navigate('/');
      }
    },
    [
      name,
      email,
      password,
      navigate,
      state,
      nameCheck,
      emailCheck,
      passwordCheck,
      passwordRetypedCheck,
    ]
  );

  // Function to create new form
  const newForm: React.MouseEventHandler = React.useCallback(
    (event: React.SyntheticEvent) => {
      // Clear Form Contents
      setName({ value: '', error: false, helperText: '' });
      setEmail({ value: '', error: false, helperText: '' });
      setPassword({ value: '', error: false, helperText: '' });
      setPasswordRetyped({ value: '', error: false, helperText: '' });

      // Create new form
      event.preventDefault();
      setDisabled(false);
    },
    []
  );

  // Check for whether user already logged in or not
  React.useEffect(() => {
    if (loginContext.login) {
      const prevLocation = (state as { prevLocation: string })?.prevLocation;
      if (prevLocation) {
        navigate(prevLocation);
      } else {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginContext]);

  return (
    <>
      <Header />
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={contentStyle.Content}>
          <Typography variant="h3" sx={formStyle.Title} align="center">
            Sign Up
          </Typography>
          <form onSubmit={formSubmit}>
            <Box sx={formBoxStyleProvider(theme, name.error)}>
              <Box>
                <Typography variant="h6" component="span">
                  Name
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={formStyle.RequiredTitle}
                >
                  *
                </Typography>
              </Box>
              <TextField
                disabled={disabled}
                variant="standard"
                color="secondary"
                placeholder="John Doe"
                value={name.value}
                helperText={name.helperText}
                error={name.error}
                margin="normal"
                onChange={onNameChange}
                onKeyPress={onKeyPress}
                onBlur={nameCheck}
              />
            </Box>
            <Box sx={formBoxStyleProvider(theme, email.error)}>
              <Box>
                <Typography variant="h6" component="span">
                  Email
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={formStyle.RequiredTitle}
                >
                  *
                </Typography>
              </Box>
              <TextField
                disabled={disabled}
                variant="standard"
                color="secondary"
                placeholder="hello@email.com"
                value={email.value}
                helperText={email.helperText}
                error={email.error}
                margin="normal"
                onChange={onEmailChange}
                onKeyPress={onKeyPress}
                onBlur={emailCheck}
              />
            </Box>
            <Box sx={formBoxStyleProvider(theme, password.error)}>
              <Box>
                <Typography variant="h6" component="span">
                  Password
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={formStyle.RequiredTitle}
                >
                  *
                </Typography>
              </Box>
              <TextField
                disabled={disabled}
                variant="standard"
                color="secondary"
                placeholder="password"
                type="password"
                value={password.value}
                helperText={password.helperText}
                error={password.error}
                margin="normal"
                onChange={onPasswordChange}
                onKeyPress={onKeyPress}
                onBlur={passwordCheck}
              />
            </Box>
            <Box sx={formBoxStyleProvider(theme, passwordRetyped.error)}>
              <Box>
                <Typography variant="h6" component="span">
                  Retype Password
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={formStyle.RequiredTitle}
                >
                  *
                </Typography>
              </Box>
              <TextField
                disabled={disabled}
                variant="standard"
                color="secondary"
                placeholder="password"
                type="password"
                value={passwordRetyped.value}
                helperText={passwordRetyped.helperText}
                error={passwordRetyped.error}
                margin="normal"
                onChange={onPasswordRetypedChange}
                onKeyPress={onKeyPress}
                onBlur={passwordRetypedCheck}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '2em 0',
              }}
            >
              <Button
                disabled={disabled}
                type="submit"
                color="secondary"
                variant="contained"
                sx={formStyle.Button}
              >
                Submit
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={newForm}
                sx={formStyle.Button}
              >
                Create New Form
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default SignUp;
