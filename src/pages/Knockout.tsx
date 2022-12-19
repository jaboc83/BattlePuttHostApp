import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { Knockout } from '../api';
import { useKnockout, useWatchKnockout } from '../hooks';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { battle } from '../routes';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Rules = ({
  numberOfDiscs,
  distance,
}: {
  numberOfDiscs: number;
  distance: number;
}) => (
  <>
    <Typography variant="h3" align="center" marginBottom={1}>
      Knockout Rules
    </Typography>
    <Typography variant="body1" gutterBottom>
      All players start with {numberOfDiscs} putters and a mark is made{' '}
      {distance} feet from the basket.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Players take turns putting their putters from the specified mark. Each
      player uses all of their remaining putters before moving to the next
      player.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Each made putt is worth {distance} (distance from the basket) points. A
      miss means that the putter is removed from that players available discs
      for the remainder of the game.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Once a player has finished putting their remaining putters they should
      mark the number of made putts on their app. Play will continue with the
      next player.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Once a player has run out of discs they are removed from the putting
      rotation for the remainder of the game.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Play continues until all players have run out of discs. The winner is the
      person with the most points in the end.
    </Typography>
  </>
);

const KnockoutPage = () => {
  const { matchId } = useParams();
  const { getKnockout } = useKnockout();
  const [knockout, setKnockout] = React.useState<Knockout | undefined>();
  const [showRules, setShowRules] = React.useState(false);

  // load the match
  React.useEffect(() => {
    const loadData = async () => {
      if (matchId) {
        const knockout = await getKnockout(matchId);
        setKnockout(knockout);
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
        TransitionComponent={Transition}
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
          <Rules
            numberOfDiscs={Number(knockout?.numberOfDiscs)}
            distance={Number(knockout?.distance)}
          />
        </Paper>
      </Dialog>
      {knockout?.matchComplete ? (
        <>
          <Typography variant="h3" align="center" color="secondary">
            {knockout?.players
              ?.sort((a, b) => (b?.score || 0) - (a?.score || 0))[0]
              .username.toUpperCase()}{' '}
            Wins!
          </Typography>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{ width: '15rem', m: 'auto' }}
            href={battle}
          >
            Play another game
          </Button>
        </>
      ) : null}
      <Typography align="center" variant="h5" marginTop={1}>
        {`Distance: ${knockout?.distance}'`}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        {knockout?.players
          ?.sort((a, b) => (b?.score || 0) - (a?.score || 0))
          .map(player => {
            const remainingPutters = knockout.remainingPutters[player.username];
            return (
              <Card
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
                  {knockout.matchComplete ? null : (
                    <Typography
                      variant="h6"
                      color={remainingPutters === 0 ? 'error' : 'inherit'}
                    >
                      {remainingPutters === 0 ? 'No' : remainingPutters} discs
                      remaining
                    </Typography>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default KnockoutPage;
