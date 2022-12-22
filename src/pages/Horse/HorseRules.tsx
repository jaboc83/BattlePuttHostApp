import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const PerfectPuttRules = () => (
  <>
    <Typography variant="h3" align="center" marginBottom={1}>
      Perfect Putt Rules
    </Typography>
    <Typography variant="body1" gutterBottom>
      In horse, the starting player begins by attempting a putt from anywhere
      they choose in whatever style they choose. If they make the putt, then the
      next player has to repeat the putt in the same way specified. If the
      second player is unable to make the putt then they receive one letter of
      the word 'Horse'.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Anytime a player misses, the next player may choose their shot from
      anywhere and play continues as mentioned above.
    </Typography>
    <Typography variant="body1" gutterBottom>
      If a player collects all the letters of the word 'Horse' they are
      eliminated from the game. The last player remaining wins.
    </Typography>
  </>
);
export default PerfectPuttRules;
