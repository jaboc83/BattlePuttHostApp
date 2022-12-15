import * as React from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { battle } from '../routes';
import { battleCodeLength } from '../codeGenerator';

const ReJoinLanding = () => {
  const [code, setCode] = React.useState<string | undefined>();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h2" gutterBottom textAlign={'center'}>
        Enter your code to re-join an existing battle.
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <form
            onSubmit={() => {
              navigate(`${battle}/${code}`);
            }}
          >
            <TextField
              id="battleCode"
              margin="none"
              label="Battle Code"
              name="battleCode"
              color="primary"
              sx={{ width: '11rem' }}
              focused
              inputProps={{
                maxLength: battleCodeLength,
                style: {
                  textTransform: 'uppercase',
                  fontSize: 20,
                  letterSpacing: '.35em',
                },
              }}
              onChange={event => {
                setCode(event.target.value?.toUpperCase());
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              size="large"
              sx={{ ml: 2, height: '4em' }}
              disabled={
                code === undefined ||
                code.trim() == '' ||
                code.length !== battleCodeLength
              }
            >
              Join
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReJoinLanding;
