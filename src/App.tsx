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

// MUI Theme (Setup Font family)
const theme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans KR", sans-serif',
    h5: {
      fontWeight: 500,
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
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/changePW" element={<div>Change Password Page</div>} />
          <Route path="/mypage" element={<div>My Page</div>} />
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
