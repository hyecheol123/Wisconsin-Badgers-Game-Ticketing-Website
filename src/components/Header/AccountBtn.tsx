/**
 * Component to render account button
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Material UI
import { Box, IconButton } from '@mui/material';
// Material UI Icon
import { AccountCircle } from '@mui/icons-material';

/**
 * React Functional Component to generate account button
 *
 * @return {React.ReactElement} Renders account button
 */
function AccountBtn(): React.ReactElement {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ padding: '4px' }}>
        <AccountCircle sx={{ height: '32px', width: '32px', color: 'white' }} />
      </IconButton>
    </Box>
  );
}

export default AccountBtn;
