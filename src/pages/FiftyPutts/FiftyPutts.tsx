import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import { FiftyPutts } from '../../api';
import { useFiftyPutts, useWatchFiftyPutts } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { battle } from '../../routes';
import SlideUpTransition from '../../layout/SlideUpTransition';
import FiftyPuttsRules from './FiftyPuttsRules';

const FiftyPuttsPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { getFiftyPutts } = useFiftyPutts();
  const [fiftyPutts, setFiftyPutts] = React.useState<FiftyPutts | undefined>();
  const [showRules, setShowRules] = React.useState(false);

  // load the match
  React.useEffect(() => {
    const loadData = async () => {
      if (matchId) {
        const fp = await getFiftyPutts(matchId);
        setFiftyPutts(fp);
      }
    };
    loadData().catch(console.error);
  }, []);

  useWatchFiftyPutts(fiftyPutts, setFiftyPutts);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0 }}>
      <Button
        variant="text"
        size="large"
        startIcon={<InfoIcon />}
        sx={{ mt: 0 }}
        onClick={() => {
          setShowRules(true);
        }}
      >
        Rules
      </Button>
      <Dialog
        open={showRules}
        onClose={() => {
          setShowRules(false);
        }}
        TransitionComponent={SlideUpTransition}
      >
        <Paper sx={{ m: 1, p: 2 }}>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <IconButton
              size="large"
              aria-label="close"
              onClick={() => setShowRules(false)}
              sx={{
                position: 'absolute',
                left: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <FiftyPuttsRules />
        </Paper>
      </Dialog>
      {fiftyPutts?.matchComplete ? (
        <>
          {fiftyPutts.players.length > 1 ? (
            <Typography
              variant="h3"
              align="center"
              color="secondary"
              marginBottom={2}
            >
              {
                fiftyPutts?.players?.sort(
                  (a, b) => (b?.score || 0) - (a?.score || 0),
                )[0].username
              }{' '}
              won!
            </Typography>
          ) : null}
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{ width: '15rem', m: 'auto' }}
            onClick={() => navigate(`${battle}/${fiftyPutts.battleCode}`)}
          >
            Play another game
          </Button>
        </>
      ) : null}
      <Typography align="center" variant="h5" marginTop={1}>
        {`Current Distance: ${
          fiftyPutts?.distances[fiftyPutts?.currentStation]
        }'`}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        {fiftyPutts?.players
          ?.sort((a, b) => (b?.score || 0) - (a?.score || 0))
          .map(player => {
            return (
              <Card
                key={player.username}
                sx={{
                  mx: 'auto',
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="secondary" align="center">
                    {player.username.toUpperCase()}
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {player.score} points
                  </Typography>
                  {fiftyPutts.matchComplete ? null : (
                    <Typography variant="h6">Something Interesting</Typography>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default FiftyPuttsPage;
