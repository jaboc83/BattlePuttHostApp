import { Box, Button, Link, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame, useMatch, useWatchMatch } from '../hooks';
import * as React from 'react';
import { Game as GameType } from '../api/game';
import { start, clientUrl, getRouteFromSlug } from '../routes';
import QRCode from 'react-qr-code';
import { Match } from '../api';
import { textAlign } from '@mui/system';

const Game = () => {
  const { slug, matchCode } = useParams();
  const { getGameBySlug } = useGame();
  const { getMatchByCode } = useMatch();
  const navigate = useNavigate();
  const [game, setGame] = React.useState<GameType | undefined>();
  const [match, setMatch] = React.useState<Match | undefined>();

  // Load data
  React.useEffect(() => {
    if (slug) {
      getGameBySlug(slug || '').then(g => {
        setGame(g);
      });
    } else {
      navigate(start);
    }

    if (matchCode) {
      getMatchByCode(matchCode).then(m => {
        setMatch(m);
      });
    }
  }, []);

  React.useEffect(() => {
    if (match?.matchStart && slug) {
      navigate(`${getRouteFromSlug(slug)}/${matchCode}`);
    }
  }, [match]);

  useWatchMatch(match, setMatch);

  const url = `${clientUrl}?code=${matchCode}`;

  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {game?.name}
      </Typography>
      <Link
        sx={{
          color: 'inherit',
          textDecoration: 'inherit',
          textAlign: 'center',
          display: 'block',
          mb: 2,
        }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="contained" color="secondary">
          Open in new Tab
        </Button>
      </Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            background: 'white',
            padding: '16px',
            textAlign: 'center',
            display: 'inline-block',
          }}
        >
          <QRCode
            value={url}
            size={128}
            style={{
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            viewBox={`0 0 128 128`}
          />
        </Box>
      </Box>
      <Typography variant="h3" color="secondary" align="center">
        {matchCode}
      </Typography>
      <Typography variant="h6" align="center" sx={{ my: 2 }}>
        {match?.players
          ? match?.players.map(p => (
              <Typography
                key={p.playerUsername}
                color="primary"
                sx={{ fontStyle: 'italic' }}
              >
                {p.playerUsername}{' '}
                {match.hostPlayerUsername == p.playerUsername
                  ? ' is the host.'
                  : ' is connected.'}
              </Typography>
            ))
          : 'Waiting for players...'}
      </Typography>
      <Typography align="center">
        {match?.players?.length != null &&
        game &&
        match.players.length >= game.minNumberOfPlayers
          ? 'Waiting for host to start the game...'
          : ''}
      </Typography>
    </Box>
  );
};

export default Game;
