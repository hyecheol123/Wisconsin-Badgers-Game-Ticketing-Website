/**
 * Component which displays error message if not found or forbidden
 *
 * @author Hyecheol (Jerry) Jang
 */

// React
import React from 'react';
// React Router
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// Material UI
import { Box, Link, Typography } from '@mui/material';
// Styles
import contentStyle from '../../globalStyles/contentStyle';
import ErrorPageStyle from './ErrorPageStyle';

// Type for the component's props
type ErrorPageProps = {
  errorCode: number;
};

/**
 * React functional component to display error message when the resource is not found
 *   or user is forbidden
 *
 * @param {ErrorPageProps} props Properties that passed from the parent Components.
 * @return {React.ReactElement} Renders Error Page
 */
function ErrorPage(props: ErrorPageProps): React.ReactElement {
  const { errorCode } = props;
  return (
    <>
      <Box sx={contentStyle.ContentWrapper}>
        <Box sx={{ ...contentStyle.Content, ...ErrorPageStyle.ContentWrapper }}>
          <Typography
            variant="h1"
            color="primary"
            sx={ErrorPageStyle.ErrorCode}
          >
            {errorCode}
          </Typography>
          <Typography variant="h6" sx={ErrorPageStyle.MessageTitle}>
            Oops! Cannot read this page!
          </Typography>
          <Typography variant="body1">
            The page you are looking for might been removed or had its name
            changed or is temporarily unavailable. Also, you might not have
            proper permission to access this page.{' '}
            <Link component={RouterLink} to="/">
              Return to homepage.
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default React.memo(ErrorPage);
