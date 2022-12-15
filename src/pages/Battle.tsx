import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Game } from '../api';
import { game } from '../routes';
import { useGame } from '../hooks/useGame';
import { generateNewCode } from '../codeGenerator';

const Battle = () => {
  const { battleId } = useParams();
  const { getGames } = useGame();
  const navigate = useNavigate();
  const [games, setGames] = React.useState<Array<Game>>([]);

  // Load the games on initial render
  React.useEffect(() => {
    getGames().then(g => {
      setGames(g);
    });
  }, []);

  return (
    <Box>
      <Typography textAlign="center">
        Welcome to lobby{' '}
        <Typography
          color="secondary"
          sx={{ fontWeight: 600, display: 'inline' }}
        >
          {battleId}
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
          sx={{ my: 1, pb: 2 }}
        >
          {games.map(g => (
            <Grid
              item
              sm={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                key={g.id}
                variant="contained"
                sx={{ height: '5rem', width: '8rem' }}
                onClick={() => {
                  navigate(`${game}/${g.slug}/${generateNewCode(4)}`);
                }}
              >
                {g.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}></Box>
      </Paper>
    </Box>
  );
};

export default Battle;
