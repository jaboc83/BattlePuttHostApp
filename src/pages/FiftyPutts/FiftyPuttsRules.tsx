import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const FiftyPuttsRules = () => (
  <>
    <Typography variant="h3" align="center" marginBottom={1}>
      Fifty Putts Rules
    </Typography>
    <Typography variant="body1" gutterBottom>
      In Fifty Putts players each take turns putting 10 putts from 5 different
      locations at progressively farther distances.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Players take turns at each station putting 10 discs and tracking their
      score. At the end of the final station the player with the most points
      wins.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Putts made are worth one point and for each set of 10 putts there are a
      number of bonus points outlined in the table below.
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Putting station</TableCell>
            <TableCell align="right">Make First Putt Bonus</TableCell>
            <TableCell align="right">Make Last Putt Bonus</TableCell>
            <TableCell align="right">Make All Putts Bonus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>First</TableCell>
            <TableCell>2</TableCell>
            <TableCell>1</TableCell>
            <TableCell>6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Second</TableCell>
            <TableCell>2</TableCell>
            <TableCell>1</TableCell>
            <TableCell>7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Third</TableCell>
            <TableCell>4</TableCell>
            <TableCell>2</TableCell>
            <TableCell>9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fourth</TableCell>
            <TableCell>6</TableCell>
            <TableCell>3</TableCell>
            <TableCell>11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fifth</TableCell>
            <TableCell>8</TableCell>
            <TableCell>4</TableCell>
            <TableCell>14</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Typography>
  </>
);
export default FiftyPuttsRules;
