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
import { PerfectPutt } from '../../api';
import { usePerfectPutt, useWatchPerfectPutt } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { battle } from '../../routes';
import SlideUpTransition from '../../layout/SlideUpTransition';
import PerfectPuttRules from './PerfectPuttRules';

const PerfectPuttPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { getPerfectPutt } = usePerfectPutt();
  const [perfectPutt, setPerfectPutt] = React.useState<
    PerfectPutt | undefined
  >();
  const [showRules, setShowRules] = React.useState(false);

  // load the match
  React.useEffect(() => {
    const loadData = async () => {
      if (matchId) {
        const pp = await getPerfectPutt(matchId);
        setPerfectPutt(pp);
      }
    };
    loadData().catch(console.error);
  }, []);

  useWatchPerfectPutt(perfectPutt, setPerfectPutt);

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
          <PerfectPuttRules
            distances={perfectPutt?.distances || []}
            numberOfDiscs={perfectPutt?.numberOfDiscs || 0}
          />
        </Paper>
      </Dialog>
      {perfectPutt?.matchComplete ? (
        <>
          {perfectPutt.players.length > 1 ? (
            <Typography
              variant="h3"
              align="center"
              color="secondary"
              marginBottom={2}
            >
              {
                perfectPutt?.players?.sort(
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
            onClick={() => navigate(`${battle}/${perfectPutt.battleCode}`)}
          >
            Play another game
          </Button>
        </>
      ) : null}
      <Typography align="center" variant="h4" marginTop={1}>
        Perfect Putt
      </Typography>
      <Typography align="center" variant="h5" marginTop={1}>
        {`Current Distance: ${
          perfectPutt?.distances[perfectPutt?.currentStation]
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
        {perfectPutt?.players
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
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default PerfectPuttPage;
