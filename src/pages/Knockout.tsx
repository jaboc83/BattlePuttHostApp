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
import { Knockout } from '../api';
import {
  useKnockout,
  useMatch,
  useWatchKnockout,
  useWatchMatch,
} from '../hooks';
import InfoIcon from '@mui/icons-material/Info';

const KnockoutPage = () => {
  const { matchCode } = useParams();
  const { getMatchByCode } = useMatch();
  const { getKnockout } = useKnockout();
  const [knockout, setKnockout] = React.useState<Knockout | undefined>();
  const theme = useTheme();

  // load the match
  React.useEffect(() => {
    const loadData = async () => {
      if (matchCode) {
        const match = await getMatchByCode(matchCode);
        if (match?.id) {
          const knockout = await getKnockout(match.id);
          setKnockout(knockout);
        }
      }
    };
    loadData().catch(console.error);
  }, []);

  useWatchKnockout(knockout, setKnockout);

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
        {`Distance: ${knockout?.distance}'`}
      </Typography>
      <Grid container>
        {knockout?.players
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

export default KnockoutPage;
