import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { battleCodeLength, generateNewCode } from '../codeGenerator';
import { battle, rejoin } from '../routes';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h2" gutterBottom textAlign={'center'}>
        Start a new Battle Putt lobby below or re-join an existing battle.
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item sm={6}>
            <Button
              variant="contained"
              sx={{ height: '5rem', width: '8rem' }}
              onClick={() => {
                navigate(`${battle}/${generateNewCode(battleCodeLength)}`);
              }}
            >
              New
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Button
              variant="contained"
              sx={{ height: '5rem', width: '8rem' }}
              onClick={() => {
                navigate(rejoin);
              }}
            >
              In Progress
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Landing;
