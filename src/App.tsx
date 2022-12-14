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
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { CssBaseline } from '@mui/material';
import { blue, red } from '@mui/material/colors';
// Router
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Font
import '@fontsource/ibm-plex-sans-kr/300.css';
import '@fontsource/ibm-plex-sans-kr/400.css';
import '@fontsource/ibm-plex-sans-kr/500.css';
// Components
import Loading from './components/Loading/Loading';
import { LoginContextProvider, useLoginContext } from './LoginContext';
import LandingPage from './LandingPage';
const Login = React.lazy(() => import('./Login'));
const ChangePW = React.lazy(() => import('./ChangePW'));
const TermsAndCondition = React.lazy(() => import('./TermsAndCondition'));
const SignUp = React.lazy(() => import('./SignUp'));
const Games = React.lazy(() => import('./Games'));
const MyTickets = React.lazy(() => import('./MyTickets'));
const GameDetail = React.lazy(() => import('./GameDetail'));
const PurchaseConfirmation = React.lazy(() => import('./PurchaseConfirmation'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage/ErrorPage'));

// MUI Theme (Setup Font family and Typogrpahy)
declare module '@mui/material/styles' {
  interface TypographyVariants {
    tcPageTitle?: React.CSSProperties;
    tcCaption?: React.CSSProperties;
    tcTitle?: React.CSSProperties;
    tcSubTitle?: React.CSSProperties;
    tcBody?: React.CSSProperties;
    tcBodyList?: React.CSSProperties;
  }

  interface TypographyVariantOptions {
    tcPageTitle?: React.CSSProperties;
    tcCaption?: React.CSSProperties;
    tcTitle?: React.CSSProperties;
    tcSubTitle?: React.CSSProperties;
    tcBody?: React.CSSProperties;
    tcBodyList?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tcPageTitle: true;
    tcCaption: true;
    tcTitle: true;
    tcSubTitle: true;
    tcBody: true;
    tcBodyList: true;
  }
}
interface ExtendedTypographyOptions extends TypographyOptions {
  tcPageTitle: React.CSSProperties;
  tcCaption: React.CSSProperties;
  tcTitle: React.CSSProperties;
  tcSubTitle: React.CSSProperties;
  tcBody: React.CSSProperties;
  tcBodyList: React.CSSProperties;
}
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
      '@media screen and (max-width: 300px)': {
        // Galaxy Fold
        fontSize: '1.0em',
      },
    },
    body2: {
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: '0.825em',
      },
    },
    tcPageTitle: {
      fontSize: '26px',
      fontWeight: 500,
      color: 'black',
      marginTop: '1em',
      marginBottom: '1em',
    },
    tcCaption: {
      fontSize: '14px',
      color: '#595959',
      fontWeight: 500,
      marginTop: '1em',
      marginBottom: '1em',
    },
    tcTitle: {
      fontSize: '18px',
      color: 'black',
      marginTop: '1em',
      marginBottom: '1em',
    },
    tcSubTitle: {
      fontSize: '16px',
      color: 'black',
      marginTop: '1em',
      marginBottom: '1em',
    },
    tcBody: {
      fontSize: '14px',
      color: '#595959',
      marginTop: '1em',
      marginBottom: '1em',
    },
    tcBodyList: {
      fontSize: '14px',
      color: '#595959',
    },
  } as ExtendedTypographyOptions,
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          tcPageTitle: 'h1',
          tcCaption: 'p',
          tcTitle: 'h2',
          tcSubTitle: 'h4',
          tcBody: 'p',
          tcBodyList: 'p',
        },
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
      loginContext.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          if (!loginContext.initialized) {
            loginContext.dispatch({
              type: 'INITIALIZE',
              login: true,
              email: user.email?.toString(),
            });
          } else {
            if (!user.email) {
              throw new Error('CANNOT FIND USER EMAIL');
            }
            loginContext.dispatch({ type: 'LOGIN', email: user.email });
          }
        } else {
          // No user is signed in
          if (!loginContext.initialized) {
            loginContext.dispatch({
              type: 'INITIALIZE',
              login: false,
            });
          } else {
            loginContext.dispatch({ type: 'LOGOUT' });
          }
        }
      });
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
          <Route
            path="/tickets"
            element={loginContext.initialized ? <MyTickets /> : <Loading />}
          />
          <Route
            path="/signup"
            element={loginContext.initialized ? <SignUp /> : <Loading />}
          />
          <Route
            path="/terms"
            element={
              loginContext.initialized ? <TermsAndCondition /> : <Loading />
            }
          />
          <Route
            path="/games"
            element={loginContext.initialized ? <Games /> : <Loading />}
          />
          <Route
            path="/games/:gameid"
            element={loginContext.initialized ? <GameDetail /> : <Loading />}
          />
          <Route
            path="/confirm/:purchaseid"
            element={
              loginContext.initialized ? <PurchaseConfirmation /> : <Loading />
            }
          />
          <Route
            path="*"
            element={
              loginContext.initialized ? (
                <ErrorPage errorCode={404} />
              ) : (
                <Loading />
              )
            }
          />
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
