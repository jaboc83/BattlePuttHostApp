import { Box, Link, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame, useMatch } from '../hooks';
import * as React from 'react';
import { Game as GameType } from '../api/game';
import { start, clientUrl } from '../routes';
import QRCode from 'react-qr-code';
import { useInterval } from '../hooks';
import { Match } from '../api';

const Game = () => {
  const { slug, matchCode } = useParams();
  const { getGameBySlug } = useGame();
  const { getMatch, getMatchByCode } = useMatch();
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

  useInterval(async () => {
    if (match?.id) {
      const m = await getMatch(match.id);
      setMatch(m);
    }
  }, 5000);

  const url = `${clientUrl}?code=${matchCode}`;

  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h2" align="center" gutterBottom>
        {game?.name}
      </Typography>
      <Typography align="center" gutterBottom width={400} margin="1em auto">
        Scan the QR code below with your phone or go to
        <Typography component="span" color="secondary" display="inline-block">
          <Link
            sx={{ color: 'inherit', textDecoration: 'inherit' }}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </Link>
        </Typography>
      </Typography>
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
