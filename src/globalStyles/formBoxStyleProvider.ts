/**
 * Function to define form box style with respect to the error flag value
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import { Theme } from '@mui/material';

/**
 * Function to generate form box style
 *
 * @param {Theme} theme Material UI Theme object
 * @param {boolean} error Whether the form value has error or not
 * @return {React.CSSProperties} CSS Properties for the form box
 */
function formBoxStyleProvider(
  theme: Theme,
  error: boolean
): React.CSSProperties {
  return {
    margin: '1em 0.5em',
    padding: '15px',
    backgroundColor: 'aliceblue',
    borderRadius: '10px',
    border: error ? `2px solid ${theme.palette.error.main}` : undefined,
  };
}

export default formBoxStyleProvider;
