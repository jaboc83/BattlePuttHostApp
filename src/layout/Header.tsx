import { Box, Link, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => (
  <AppBar enableColorOnDark color="primary" position="sticky">
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Link
        component={RouterLink}
        to="/start"
        sx={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <Typography
          variant="h3"
          component={'h1'}
          sx={{ fontWeight: 500 }}
          align="center"
        >
          Battle Putt Host
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Header;
