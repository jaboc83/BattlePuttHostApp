import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import * as React from 'react';
import { Game as GameType } from '../api/game';
import { start } from '../routes';
import QRCode from 'react-qr-code';
import { generateNewCode } from '../codeGenerator';

const Game = () => {
  const { slug, code } = useParams();
  const { getGameBySlug } = useGame();
  const navigate = useNavigate();
  const [game, setGame] = React.useState<GameType | undefined>();

  // Load data
  React.useEffect(() => {
    if (slug) {
      getGameBySlug(slug || '').then(g => {
        setGame(g);
      });
    } else {
      navigate(start);
    }
  }, []);

  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h2" align="center" gutterBottom>
        {game?.name}
      </Typography>
      <Typography align="center" gutterBottom width={400} margin="1em auto">
        Scan the QR code below with your phone or go to https://xyz.com/ and
        manually enter the{' '}
        <Typography color="secondary" display="inline-block">
          code
        </Typography>{' '}
        below.
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            value={`https://google.com/${game?.slug}`}
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
        {code}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        sx={{ my: 2, fontStyle: 'italic' }}
      >
        Waiting for players...
      </Typography>
    </Box>
  );
};

export default Game;
