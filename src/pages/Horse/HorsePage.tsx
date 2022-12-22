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
import { Horse } from '../../api';
import { useHorse, useWatchHorse } from '../../hooks';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { battle } from '../../routes';
import SlideUpTransition from '../../layout/SlideUpTransition';
import HorseRules from './HorseRules';

const HorsePage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { getHorse } = useHorse();
  const [horse, setHorse] = React.useState<Horse | undefined>();
  const [showRules, setShowRules] = React.useState(false);

  // load the match
  React.useEffect(() => {
    const loadData = async () => {
      if (matchId) {
        const h = await getHorse(matchId);
        setHorse(h);
      }
    };
    loadData().catch(console.error);
  }, []);

  useWatchHorse(horse, setHorse);

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
          <HorseRules />
        </Paper>
      </Dialog>
      {horse?.matchComplete ? (
        <>
          {horse.players.length > 1 ? (
            <Typography
              variant="h3"
              align="center"
              color="secondary"
              marginBottom={2}
            >
              {horse?.players?.find(p => p.score! < 5)!.username} won!
            </Typography>
          ) : null}
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{ width: '15rem', m: 'auto' }}
            onClick={() => navigate(`${battle}/${horse.battleCode}`)}
          >
            Play another game
          </Button>
        </>
      ) : null}
      <Typography align="center" variant="h4" marginTop={1}>
        Horse
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        {horse?.players
          ?.sort((a, b) => (a?.score || 0) - (b?.score || 0))
          .map(player => {
            return (
              <Card
                key={player.username}
                sx={{
                  mx: 'auto',
                  marginBottom: 2,
                }}
              >
                <CardContent sx={{ width: '10rem' }}>
                  <Typography variant="h6" color="secondary" align="center">
                    {player.username.toUpperCase()}
                  </Typography>
                  <Typography
                    component={'span'}
                    variant="h5"
                    color="primary"
                    sx={{ letterSpacing: 8 }}
                  >
                    {Array.from(Array(player.score).keys())
                      .reduce((word: Array<string>, curr: number) => {
                        word.push('HORSE'[curr]);
                        return word;
                      }, [])
                      .join('')}
                  </Typography>
                  <Typography
                    component={'span'}
                    variant="h5"
                    color="#444"
                    sx={{ letterSpacing: 8 }}
                  >
                    {Array.from(Array(5 - player.score).keys())
                      .reduce((word: Array<string>, curr: number) => {
                        word.push('HORSE'[curr + player.score]);
                        return word;
                      }, [])
                      .join('')}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default HorsePage;
