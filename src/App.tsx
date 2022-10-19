/**
 * Entry point of the application
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

// React
import React from 'react';
import { createRoot } from 'react-dom/client';
// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { blue, red } from '@mui/material/colors';
// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Font
import '@fontsource/ibm-plex-sans-kr/300.css';
import '@fontsource/ibm-plex-sans-kr/400.css';
import '@fontsource/ibm-plex-sans-kr/500.css';
// Components
import Loading from './components/Loading/Loading';
import { LoginContextProvider, useLoginContext } from './LoginContext';
import LandingPage from './LandingPage';
import Login from './Login';
import ChangePW from './ChangePW';

// MUI Theme (Setup Font family)
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};
const theme = createTheme({
  breakpoints,
  typography: {
    fontFamily: '"IBM Plex Sans KR", sans-serif',
    h3: {
      fontWeight: 500,
      fontSize: '2.5em',
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: '2em',
      },
      '@media screen and (max-width: 300px)': {
        // Galaxy Fold
        fontSize: '1.55em',
      },
    },
    h5: {
      fontWeight: 500,
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: '1.3em',
      },
    },
    h6: {
      [`@media screen and (max-width: 300px)`]: {
        // Galaxy Fold
        fontSize: '1.0em',
      },
    },
    body2: {
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: '0.825em',
      },
    },
  },
  palette: {
    primary: red,
    secondary: blue,
  },
});

/**
 * React functional component to render the application content
 *
 * @return {React.ReactElement} The content of the application
 */
function App(): React.ReactElement {
  // State
  const loginContext = useLoginContext();

  // Initialize Application - Run only once
  React.useEffect(() => {
    // When application is not initialized
    if (!loginContext.initialized) {
      // Check whether user token alive or not
      if (localStorage.getItem('LOGIN') === 'yes') {
        // TODO: API Call to Renew Token
        loginContext.dispatch({ type: 'INITIALIZE', login: true });
        // TOOD: If failed, unset local storage flag
      } else {
        localStorage.removeItem('LOGIN');
        loginContext.dispatch({ type: 'INITIALIZE', login: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={loginContext.initialized ? <LandingPage /> : <Loading />}
          />
          <Route
            path="/login"
            element={loginContext.initialized ? <Login /> : <Loading />}
          />
          <Route
            path="/changePW"
            element={loginContext.initialized ? <ChangePW /> : <Loading />}
          />
          <Route path="/mypage" element={<div>My Page</div>} />
          <Route path="/signup" element={<div>Sign Up Page</div>} />
          <Route path="/terms" element={<div>Terms and Condition</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

/**
 * React functional component to render the application's entry point
 *
 * @return {React.ReactElement} The entry point of the application
 */
function AppWrapper(): React.ReactElement {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
        <LoginContextProvider>
          <App />
        </LoginContextProvider>
      </React.Suspense>
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AppWrapper />);
