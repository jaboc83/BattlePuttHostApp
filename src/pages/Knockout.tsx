import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { Match } from '../api';
import { useMatch, useWatchMatch } from '../hooks';
import InfoIcon from '@mui/icons-material/Info';

const Knockout = () => {
  const { matchCode } = useParams();
  const { getMatchByCode } = useMatch();
  const [match, setMatch] = React.useState<Match | undefined>();
  const theme = useTheme();

  // load the match
  React.useEffect(() => {
    if (matchCode) {
      getMatchByCode(matchCode).then(m => setMatch(m));
    }
  }, []);

  useWatchMatch(match, setMatch);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0 }}>
      <Button
        variant="text"
        size="large"
        startIcon={<InfoIcon />}
        sx={{ mt: 0 }}
      >
        Rules
      </Button>
      <Typography align="center" variant="h5" marginTop={1}>
        Distance: 18'
      </Typography>
      <Grid container>
        {match?.players
          ?.sort((a, b) => (b?.score || 0) - (a?.score || 0))
          .map(player => {
            return (
              <Grid item key={player.playerUsername}>
                <TextField
                  variant="standard"
                  margin="normal"
                  size="small"
                  disabled={true}
                  label={player.playerUsername?.toUpperCase()}
                  color="secondary"
                  inputProps={{
                    style: { fontSize: 25 },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 22,
                      color: theme.palette.secondary.main,
                      fontWeight: 500,
                    },
                  }}
                  value={player.score}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Knockout;
