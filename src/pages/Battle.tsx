import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Game, Battle as BattleType } from '../api';
import { game } from '../routes';
import { useBattle, useGame, useMatch } from '../hooks';

const Battle = () => {
  const { battleCode } = useParams();
  const { getGames } = useGame();
  const { getBattleByCode } = useBattle();
  const { createMatch } = useMatch();
  const navigate = useNavigate();
  const [games, setGames] = React.useState<Array<Game>>([]);
  const [battle, setBattle] = React.useState<BattleType | undefined>();

  // Load the games on initial render
  React.useEffect(() => {
    getGames().then(g => {
      setGames(g);
    });
  }, []);

  // Load the games on initial render
  React.useEffect(() => {
    if (battleCode)
      getBattleByCode(battleCode).then(b => {
        setBattle(b);
      });
  }, []);

  return (
    <Box>
      <Typography textAlign="center">
        Welcome to lobby{' '}
        <Typography
          component="span"
          color="secondary"
          sx={{ fontWeight: 600, display: 'inline' }}
        >
          {battleCode}
        </Typography>
        , select a game below to start a new game.
      </Typography>
      <Paper>
        <Grid
          container
          spacing={3}
          columns={{ xs: 4, sm: 8, md: 10 }}
          alignItems="center"
          justifyContent="center"
          sx={{ my: 1, pb: 2, px: 2 }}
        >
          {battleCode && games.length > 0
            ? games.map(g => (
                <Grid
                  key={g.slug}
                  item
                  sm={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    sx={{ height: '5rem', width: '8rem' }}
                    onClick={() => {
                      if (battle?.battleCode) {
                        createMatch(battle.battleCode, g.slug).then(m => {
                          navigate(
                            `${game}/${battleCode}/${g.slug}/${m.matchId}`,
                          );
                        });
                      }
                    }}
                  >
                    {g.name}
                  </Button>
                </Grid>
              ))
            : Array.from(Array(8).keys())
                .map(x => x + 1)
                .map(g => (
                  <Grid
                    key={g}
                    item
                    sm={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Skeleton
                      variant="rectangular"
                      width="12rem"
                      height="5rem"
                    />
                  </Grid>
                ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}></Box>
      </Paper>
    </Box>
  );
};

export default Battle;
