import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <Grid container sx={{ margin: '0 auto', padding: '6rem 0', maxWidth: 540 }}>
        <Grid item xs={ 12 }>
          <main>
            { children }
          </main>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DefaultLayout;